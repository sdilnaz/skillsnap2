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
        <CardTitle>Анализ фотографии</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid gap-4">
          <h3 className="text-xl font-semibold">Композиция</h3>
          <p><strong>Фидбек:</strong> {evaluation.composition.feedback}</p>
          <p><strong>Предложения по улучшению:</strong> {evaluation.composition.suggestions_for_improvement}</p>
          <p><strong>Счет:</strong> {evaluation.composition.score}</p>
        </div>
        <div className="grid gap-4">
          <h3 className="text-xl font-semibold">Освещение</h3>
          <p><strong>Фидбек:</strong> {evaluation.lighting.feedback}</p>
          <p><strong>Предложения по улучшению:</strong> {evaluation.lighting.suggestions_for_improvement}</p>
          <p><strong>Счет:</strong> {evaluation.lighting.score}</p>
        </div>
        <div className="grid gap-4">
          <h3 className="text-xl font-semibold">Экспозиция</h3>
          <p><strong>Фидбек:</strong> {evaluation.exposure.feedback}</p>
          <p><strong>Предложения по улучшению:</strong> {evaluation.exposure.suggestions_for_improvement}</p>
          <p><strong>Счет:</strong> {evaluation.exposure.score}</p>
        </div>
        <div className="grid gap-4">
          <h3 className="text-xl font-semibold">Расположение Объктов</h3>
          <p><strong>Фидбек:</strong> {evaluation.placement_of_objects.feedback}</p>
          <p><strong>Предложения по улучшению:</strong> {evaluation.placement_of_objects.suggestions_for_improvement}</p>
          <p><strong>Счет:</strong> {evaluation.placement_of_objects.score}</p>
        </div>
        <div className="grid gap-4">
          <h3 className="text-xl font-semibold">Правило Третей</h3>
          <p><strong>Фидбек:</strong> {evaluation.rule_of_thirds.feedback}</p>
          <p><strong>Предложения по улучшению:</strong> {evaluation.rule_of_thirds.suggestions_for_improvement}</p>
          <p><strong>Счет:</strong> {evaluation.rule_of_thirds.score}</p>
        </div>
        <div className="grid gap-4">
          <h3 className="text-xl font-semibold">Сильные стороны фотографии</h3>
          <p><strong>Фидбек:</strong> {evaluation.strong_sides_of_photo.feedback}</p>
        </div>
        <div className="grid gap-4">
          <h3 className="text-xl font-semibold">Предложения по улучшению</h3>
          <p><strong>Фидбек:</strong> {evaluation.suggestions_for_improvement.feedback}</p>
        </div>
      </CardContent>
    </Card>
  );
}