import { useState } from "react";
import { useParams } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import QuestionEditor from "../../components/evaluations/QuestionEditor";

export default function EvaluationEditPage() {
  const { id } = useParams();

  // Données locales de l'évaluation
  const [evaluation, setEvaluation] = useState({
    id: id,
    titre: "Évaluation React.js",
    formation_titre: "Développement Web avec React",
    seuil_reussite: 70,

    questions: [
      {
        id: 1,
        texte: "Qu'est-ce que React ?",
        options: [
          {
            id: 1,
            texte: "Une bibliothèque JavaScript",
            est_correcte: true,
          },
          {
            id: 2,
            texte: "Un langage de programmation",
            est_correcte: false,
          },
          {
            id: 3,
            texte: "Une base de données",
            est_correcte: false,
          },
        ],
      },
      {
        id: 2,
        texte: "Quel hook permet de gérer l'état dans un composant React ?",
        options: [
          {
            id: 4,
            texte: "useState",
            est_correcte: true,
          },
          {
            id: 5,
            texte: "useDatabase",
            est_correcte: false,
          },
          {
            id: 6,
            texte: "useStyle",
            est_correcte: false,
          },
        ],
      },
    ],
  });

  const [error, setError] = useState("");

  // ==============================
  // AJOUTER UNE QUESTION
  // ==============================
  function handleAddQuestion(data) {
    const nouvelleQuestion = {
      id: Date.now(),
      texte:
        data.texte ||
        data.question ||
        "Nouvelle question",
      options: [],
    };

    setEvaluation((prev) => ({
      ...prev,
      questions: [
        ...prev.questions,
        nouvelleQuestion,
      ],
    }));

    setError("");
  }

  // ==============================
  // SUPPRIMER UNE QUESTION
  // ==============================
  function handleRemoveQuestion(questionId) {
    const confirmation = window.confirm(
      "Supprimer cette question ?"
    );

    if (!confirmation) {
      return;
    }

    setEvaluation((prev) => ({
      ...prev,
      questions: prev.questions.filter(
        (question) => question.id !== questionId
      ),
    }));

    setError("");
  }

  // ==============================
  // AJOUTER UNE OPTION
  // ==============================
  function handleAddOption(questionId, texte) {
    if (!texte || !texte.trim()) {
      setError("Le texte de l'option est obligatoire.");
      return;
    }

    const nouvelleOption = {
      id: Date.now(),
      texte: texte.trim(),
      est_correcte: false,
    };

    setEvaluation((prev) => ({
      ...prev,
      questions: prev.questions.map(
        (question) => {
          if (question.id !== questionId) {
            return question;
          }

          return {
            ...question,
            options: [
              ...question.options,
              nouvelleOption,
            ],
          };
        }
      ),
    }));

    setError("");
  }

  // ==============================
  // MODIFIER LA BONNE RÉPONSE
  // ==============================
  function handleToggleOptionCorrect(
    questionId,
    optionId
  ) {
    setEvaluation((prev) => ({
      ...prev,
      questions: prev.questions.map(
        (question) => {
          if (question.id !== questionId) {
            return question;
          }

          return {
            ...question,

            options: question.options.map(
              (option) => ({
                ...option,
                est_correcte:
                  option.id === optionId,
              })
            ),
          };
        }
      ),
    }));

    setError("");
  }

  // ==============================
  // SUPPRIMER UNE OPTION
  // ==============================
  function handleRemoveOption(
    questionId,
    optionId
  ) {
    const confirmation = window.confirm(
      "Supprimer cette option ?"
    );

    if (!confirmation) {
      return;
    }

    setEvaluation((prev) => ({
      ...prev,
      questions: prev.questions.map(
        (question) => {
          if (question.id !== questionId) {
            return question;
          }

          return {
            ...question,
            options: question.options.filter(
              (option) => option.id !== optionId
            ),
          };
        }
      ),
    }));

    setError("");
  }

  return (
    <AdminLayout>
      <div className="min-h-screen bg-slate-50 p-6">

        {/* ==============================
            EN-TÊTE
        ============================== */}
        <div className="mb-6">

          <h1 className="text-2xl font-bold text-slate-800">
            {evaluation.titre}
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Formation :{" "}
            <span className="font-medium text-slate-700">
              {evaluation.formation_titre}
            </span>

            {" · "}

            Seuil de réussite :{" "}
            <span className="font-medium text-indigo-600">
              {evaluation.seuil_reussite}%
            </span>
          </p>

        </div>

        {/* ==============================
            ERREUR
        ============================== */}
        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* ==============================
            QUESTIONS
        ============================== */}
        <div className="rounded-xl bg-white p-6 shadow-sm">

          <QuestionEditor
            questions={evaluation.questions || []}
            onAddQuestion={handleAddQuestion}
            onRemoveQuestion={handleRemoveQuestion}
            onAddOption={handleAddOption}
            onToggleOptionCorrect={
              handleToggleOptionCorrect
            }
            onRemoveOption={handleRemoveOption}
          />

        </div>

      </div>
    </AdminLayout>
  );
}