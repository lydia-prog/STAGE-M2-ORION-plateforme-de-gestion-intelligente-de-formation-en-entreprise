import { useState } from "react";

const FORMATS = [
  { value: "presentiel", label: "Présentiel" },
  { value: "en_ligne", label: "En ligne" },
  { value: "hybride", label: "Hybride" },
];

export default function FormationForm({ initialData, onSubmit }) {
  const [titre, setTitre] = useState(initialData?.titre || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [contenu, setContenu] = useState(initialData?.contenu || "");
  const [duree, setDuree] = useState(initialData?.duree || "");
  const [format, setFormat] = useState(initialData?.format || "en_ligne");
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  function validate() {
    const nextErrors = {};

    if (!titre.trim()) {
      nextErrors.titre = "Le titre est obligatoire.";
    }

    if (duree === "" || Number(duree) <= 0) {
      nextErrors.duree = "Indiquez une durée valide (en heures).";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMessage("");

    if (!validate()) {
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit({
        titre: titre.trim(),
        description: description.trim(),
        contenu: contenu.trim(),
        duree: Number(duree),
        format,
      });
    } catch (err) {
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Une erreur est survenue lors de l'enregistrement."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="max-w-lg space-y-4 rounded-lg border border-slate-200 bg-white p-6"
    >
      {errorMessage && (
        <div
          role="alert"
          className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
        >
          {errorMessage}
        </div>
      )}

      <div>
        <label
          htmlFor="formation-titre"
          className="mb-1 block text-sm font-medium text-slate-700"
        >
          Titre <span className="text-red-500">*</span>
        </label>
        <input
          id="formation-titre"
          type="text"
          value={titre}
          onChange={(e) => setTitre(e.target.value)}
          aria-invalid={Boolean(errors.titre)}
          aria-describedby={errors.titre ? "formation-titre-error" : undefined}
          className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-1 ${
            errors.titre
              ? "border-red-400 focus:border-red-500 focus:ring-red-500"
              : "border-slate-300 focus:border-indigo-500 focus:ring-indigo-500"
          }`}
          placeholder="Ex : Sécurité informatique niveau 1"
        />
        {errors.titre && (
          <p id="formation-titre-error" className="mt-1 text-xs text-red-600">
            {errors.titre}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="formation-description"
          className="mb-1 block text-sm font-medium text-slate-700"
        >
          Description
        </label>
        <textarea
          id="formation-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label
          htmlFor="formation-contenu"
          className="mb-1 block text-sm font-medium text-slate-700"
        >
          Contenu
        </label>
        <textarea
          id="formation-contenu"
          value={contenu}
          onChange={(e) => setContenu(e.target.value)}
          rows={4}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <label
            htmlFor="formation-duree"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Durée (heures) <span className="text-red-500">*</span>
          </label>
          <input
            id="formation-duree"
            type="number"
            min="0"
            value={duree}
            onChange={(e) => setDuree(e.target.value)}
            aria-invalid={Boolean(errors.duree)}
            aria-describedby={errors.duree ? "formation-duree-error" : undefined}
            className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-1 ${
              errors.duree
                ? "border-red-400 focus:border-red-500 focus:ring-red-500"
                : "border-slate-300 focus:border-indigo-500 focus:ring-indigo-500"
            }`}
          />
          {errors.duree && (
            <p id="formation-duree-error" className="mt-1 text-xs text-red-600">
              {errors.duree}
            </p>
          )}
        </div>

        <div className="flex-1">
          <label
            htmlFor="formation-format"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Format
          </label>
          <select
            id="formation-format"
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            {FORMATS.map((f) => (
              <option key={f.value} value={f.value}>
                {f.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {submitting ? "Enregistrement..." : "Enregistrer la formation"}
      </button>
    </form>
  );
}