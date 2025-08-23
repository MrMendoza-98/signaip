import { useState } from "react";

export function useMarcaForm(initialNombre = "", initialDescripcion = "") {
  const [nombre, setNombre] = useState(initialNombre);
  const [descripcion, setDescripcion] = useState(initialDescripcion);
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<{nombre?: string; descripcion?: string}>({});
  const [editId, setEditId] = useState<number | null>(null);

  function validateStep() {
    const newErrors: {nombre?: string; descripcion?: string} = {};
    if (step === 1) {
      if (!nombre.trim()) {
        newErrors.nombre = "El nombre de la marca es obligatorio.";
      } else if (!/^[\w\sáéíóúÁÉÍÓÚñÑ-]+$/.test(nombre)) {
        newErrors.nombre = "Solo se permiten letras, números y espacios.";
      }
    }
    if (step === 2) {
      if (!descripcion.trim()) {
        newErrors.descripcion = "La descripción es obligatoria.";
      } else if (descripcion.length < 5) {
        newErrors.descripcion = "La descripción debe tener al menos 5 caracteres.";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function nextStep() {
    if (validateStep()) {
      setStep(step + 1);
    }
  }

  function prevStep() {
    setStep(step - 1);
  }

  function resetForm() {
    setNombre("");
    setDescripcion("");
    setStep(1);
    setErrors({});
    setEditId(null);
  }

  return {
    nombre,
    setNombre,
    descripcion,
    setDescripcion,
    step,
    setStep,
    errors,
    setErrors,
    editId,
    setEditId,
    validateStep,
    nextStep,
    prevStep,
    resetForm,
  };
}
