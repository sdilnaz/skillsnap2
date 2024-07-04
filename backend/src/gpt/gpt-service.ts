
import openai from '../openai';
import fetch from 'node-fetch';
import { Buffer } from 'buffer';
import { systemPromptJsonExample } from './gpt-types';

const systemPrompt = `
You are a professional photographer. 
Evaluate the image based on composition, lighting, exposure, placement of objects, and adherence to the rule of thirds.
You will recieve an image made by a user.
Identify the strengths and areas for improvement in the photo.
Provide constructive feedback on how the photographer can enhance the image.
Ensure that your analysis is detailed and includes specific suggestions for improvement in each category.
Do not discribe what is on picture, give constructiove feedback. 
Provide the feedback in JSON format with categories "composition", "lighting", "exposure", "placement_of_objects", "rule_of_thirds", "strong sides of photo", "suggestion to improve".
Highlight the modt importnt parts. For each categorie put score from 0 to 100. Without any delimeters such as commas or quotes return JSON format (also do not print in your response \n's)
The JSON format should be as follows:
${systemPromptJsonExample}
`;

class GptService {
    async evaluateImage(imageUrl: string) {
        try {
            console.log('Attempting to evaluate image');

            const base64Image = await this.convertImageUrlToBase64(imageUrl);
            let imageDataUrl = `data:image/jpeg;base64,${base64Image}`;
            
            const response = await openai.chat.completions.create({
                model: 'gpt-4o',
                response_format: {
                  type: 'json_object'
                },
                messages: [
                    {
                        role: 'system',
                        content: systemPrompt,
                    },
                    {
                        role: 'user',
                        content: [
                            {
                                type: "text",
                                text: "Analyze the following image:"
                            },
                            {
                                type: "image_url",
                                image_url: {
                                    url: imageDataUrl
                                }
                            }
                        ]
                    }
                ],
                max_tokens: 3000
            });
            if (!response || !response.choices || !response.choices[0].message || !response.choices[0].message.content) {
                throw new Error('Invalid response format from OpenAI');
            }

            const resJson: string = response.choices[0].message.content;
            return resJson;
        } catch (error: any) {
            console.error('Error evaluating image:', error.message);
            throw new Error('Failed to evaluate image using OpenAI');
        }
    }

    private async convertImageUrlToBase64(imageUrl: string): Promise<string> {
        try {
            const response = await fetch(imageUrl);
            const buffer = await response.buffer();
            return buffer.toString('base64');
        } catch (error) {
            console.error('Error fetching image from URL:', error);
            throw new Error('Failed to fetch image from URL');
        }
    }
}

export default GptService;
