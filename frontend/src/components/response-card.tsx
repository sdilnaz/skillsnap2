import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

interface Evaluation {
  composition: {
    feedback: string;
    suggestions_for_improvement: string;
    score: number;
  };
  lighting: {
    feedback: string;
    suggestions_for_improvement: string;
    score: number;
  };
  exposure: {
    feedback: string;
    suggestions_for_improvement: string;
    score: number;
  };
  placement_of_objects: {
    feedback: string;
    suggestions_for_improvement: string;
    score: number;
  };
  rule_of_thirds: {
    feedback: string;
    suggestions_for_improvement: string;
    score: number;
  };
  strong_sides_of_photo: {
    feedback: string;
  };
  suggestions_for_improvement: {
    feedback: string;
  };
}

interface ResponseCardProps {
  evaluation: Evaluation;
}

export function ResponseCard({ evaluation }: ResponseCardProps) {
  return (
    <Card className="w-full max-w-2xl p-4 bg-transparent backdrop-blur-sm ">
      <CardHeader>
        <CardTitle>Photo Analysis</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid gap-4">
          <h3 className="text-xl font-semibold">Composition</h3>
          <p><strong>Feedback:</strong> {evaluation.composition.feedback}</p>
          <p><strong>Suggestions for Improvement:</strong> {evaluation.composition.suggestions_for_improvement}</p>
          <p><strong>Score:</strong> {evaluation.composition.score}</p>
        </div>
        <div className="grid gap-4">
          <h3 className="text-xl font-semibold">Lighting</h3>
          <p><strong>Feedback:</strong> {evaluation.lighting.feedback}</p>
          <p><strong>Suggestions for Improvement:</strong> {evaluation.lighting.suggestions_for_improvement}</p>
          <p><strong>Score:</strong> {evaluation.lighting.score}</p>
        </div>
        <div className="grid gap-4">
          <h3 className="text-xl font-semibold">Exposure</h3>
          <p><strong>Feedback:</strong> {evaluation.exposure.feedback}</p>
          <p><strong>Suggestions for Improvement:</strong> {evaluation.exposure.suggestions_for_improvement}</p>
          <p><strong>Score:</strong> {evaluation.exposure.score}</p>
        </div>
        <div className="grid gap-4">
          <h3 className="text-xl font-semibold">Placement of Objects</h3>
          <p><strong>Feedback:</strong> {evaluation.placement_of_objects.feedback}</p>
          <p><strong>Suggestions for Improvement:</strong> {evaluation.placement_of_objects.suggestions_for_improvement}</p>
          <p><strong>Score:</strong> {evaluation.placement_of_objects.score}</p>
        </div>
        <div className="grid gap-4">
          <h3 className="text-xl font-semibold">Rule of Thirds</h3>
          <p><strong>Feedback:</strong> {evaluation.rule_of_thirds.feedback}</p>
          <p><strong>Suggestions for Improvement:</strong> {evaluation.rule_of_thirds.suggestions_for_improvement}</p>
          <p><strong>Score:</strong> {evaluation.rule_of_thirds.score}</p>
        </div>
        <div className="grid gap-4">
          <h3 className="text-xl font-semibold">Strong Sides of Photo</h3>
          <p><strong>Feedback:</strong> {evaluation.strong_sides_of_photo.feedback}</p>
        </div>
        <div className="grid gap-4">
          <h3 className="text-xl font-semibold">Suggestions for Improvement</h3>
          <p><strong>Feedback:</strong> {evaluation.suggestions_for_improvement.feedback}</p>
        </div>
      </CardContent>
    </Card>
  );
}