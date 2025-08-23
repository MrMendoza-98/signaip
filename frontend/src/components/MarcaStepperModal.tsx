import React from "react";
import { FaArrowRight, FaArrowLeft, FaSave } from "react-icons/fa";

interface Props {
  show: boolean;
  step: number;
  nombre: string;
  descripcion: string;
  errors: {nombre?: string; descripcion?: string};
  onNombreChange: (v: string) => void;
  onDescripcionChange: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onStepChange: (step: number) => void;
  onCancel: () => void;
}

const MarcaStepperModal: React.FC<Props> = ({
  show,
  step,
  nombre,
  descripcion,
  errors,
  onNombreChange,
  onDescripcionChange,
  onSubmit,
  onStepChange,
  onCancel,
}) => {
  if (!show) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded shadow w-full max-w-lg relative">
        <h2 className="text-xl font-bold mb-4 text-center">Servicios/Registro de Marca</h2>
        <div className="flex justify-center items-center gap-4 mb-6">
          <div className="flex flex-col items-center">
            <span className={`w-8 h-8 flex items-center justify-center rounded-full font-bold ${step === 1 ? 'bg-red-500 text-white' : 'border-2 border-gray-400 text-gray-700'}`}>1</span>
          </div>
          <div className="flex flex-col items-center">
            <span className={`w-8 h-8 flex items-center justify-center rounded-full font-bold ${step === 2 ? 'bg-red-500 text-white' : 'border-2 border-gray-400 text-gray-700'}`}>2</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-gray-400 text-gray-700 font-bold">3</span>
          </div>
        </div>
        <div className="text-center font-semibold mb-4">Información de la Marca</div>
        <form onSubmit={onSubmit} className="flex flex-col gap-6">
          {step === 1 && (
            <label className="flex flex-col gap-2 items-center w-full">
              <span className="font-medium">Marca a Registrar</span>
              <input
                type="text"
                placeholder="Nombre de la marca"
                value={nombre}
                onChange={e => onNombreChange(e.target.value)}
                className={`border p-2 rounded w-64 text-center ${errors.nombre ? 'border-red-500' : ''}`}
                required
              />
              {errors.nombre && <span className="text-red-500 text-sm mt-1">{errors.nombre}</span>}
            </label>
          )}
          {step === 2 && (
            <label className="flex flex-col gap-2 items-center w-full">
              <span className="font-medium">Descripción de la Marca</span>
              <input
                type="text"
                placeholder="Descripción"
                value={descripcion}
                onChange={e => onDescripcionChange(e.target.value)}
                className={`border p-2 rounded w-64 text-center ${errors.descripcion ? 'border-red-500' : ''}`}
                required
              />
              {errors.descripcion && <span className="text-red-500 text-sm mt-1">{errors.descripcion}</span>}
            </label>
          )}
          {step === 1 && (
            <div className="flex justify-end">
              <button type="submit" className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-8 rounded shadow flex items-center gap-2">
                Continuar <FaArrowRight />
              </button>
            </div>
          )}
          {step === 2 && (
            <div className="flex justify-between">
              <button type="button" className="bg-gray-400 text-white font-bold py-2 px-8 rounded shadow flex items-center gap-2" onClick={() => onStepChange(1)}>
                <FaArrowLeft /> Volver
              </button>
              <button type="submit" className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-8 rounded shadow flex items-center gap-2">
                Continuar <FaArrowRight />
              </button>
            </div>
          )}
          {step === 3 && (
            <div className="flex flex-col gap-4 items-center">
              <div className="w-full bg-gray-100 rounded p-4 mb-2">
                <div className="mb-2"><span className="font-semibold">Marca:</span> {nombre}</div>
                <div><span className="font-semibold">Descripción:</span> {descripcion}</div>
              </div>
              <div className="flex justify-between w-full">
                <button type="button" className="bg-gray-400 text-white font-bold py-2 px-8 rounded shadow flex items-center gap-2" onClick={() => onStepChange(2)}>
                  <FaArrowLeft /> Volver
                </button>
                <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-8 rounded shadow flex items-center gap-2">
                  Guardar <FaSave />
                </button>
              </div>
            </div>
          )}
        </form>
        <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl" onClick={onCancel}>&times;</button>
      </div>
    </div>
  );
};

export default MarcaStepperModal;
