
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react"; // Using lucide-react for close icon

interface GenerateLessonProps {
  onClose: () => void;
}

export function GenerateLesson({ onClose }: GenerateLessonProps) {
  const [topic, setTopic] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic) {
      setError('Please enter a topic');
      return;
    }
    const user_id_placeholder = 1;

    try {
      const response = await fetch('http://localhost:5000/api/gpt/generate-lesson', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: topic, userId: user_id_placeholder }), 
      });

      if (!response.ok) {
        const responseData = await response.json();
        if (responseData.message === 'Invalid topic. Please enter a valid photography-related topic.') {
          setError('Invalid topic. Please enter a valid photography-related topic.');
        } else {
          throw new Error('Network response was not ok');
        }
      } else {
        const data = await response.json();
        console.log('Generated lesson:', data);
        onClose(); 
      }
    } catch (error) {
      console.error('Error generating lesson:', error);
      setError('Failed to generate lesson. Please try again later.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background">
      <Card className="relative w-full max-w-md p-6 space-y-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="h-6 w-6" />
        </button>
        <CardHeader>
          <CardTitle>Сгенерируй свой урок</CardTitle>
          <CardDescription>Не нашли желаемый урок? Введи название урок и мы создадим кастомизированный урок только для тебя</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="topic">Тема</Label>
              <Input
                id="topic"
                type="text"
                placeholder="Enter a topic"
                className="w-full rounded-full"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full rounded-full">
              Создать урок
            </Button>
            {error && <div className="mt-4 text-red-500">{error}</div>}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
