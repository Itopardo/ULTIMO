
"use client";
import { useState } from "react";

export default function CalculadoraMangas() {
  const [cantidad, setCantidad] = useState();
  const [largo, setLargo] = useState();
  const [diametro, setDiametro] = useState();
  const [anchoRollo, setAnchoRollo] = useState(2.1);
  const [largoRollo, setLargoRollo] = useState(50);
  const [tapa, setTapa] = useState(false);
  const [refuerzo, setRefuerzo] = useState(false);
  const [snapband, setSnapband] = useState(false);
  const [faldon, setFaldon] = useState(false);
  const [mostrar, setMostrar] = useState(false);

  const pi = Math.PI;
  const isValid = largo > 0 && diametro > 0 && anchoRollo > 0 && largoRollo > 0;

  const largoReal = largo + 0.03;
  const anchoReal = pi * diametro + 0.02;

  const areaTapa = tapa ? pi * Math.pow((diametro + 0.04) / 2, 2) : 0;
  const areaRefuerzo = refuerzo ? pi * diametro * 0.14 : 0;
  const areaSnapband = snapband ? pi * diametro * 0.05 : 0;
  const areaFaldon = faldon ? pi * diametro * 0.2 : 0;

  const areaManga = isValid ? largoReal * anchoReal + areaTapa + areaRefuerzo + areaSnapband + areaFaldon : 0;
  const areaTotal = isValid && cantidad > 0 ? areaManga * cantidad : 0;
  const metrosUsados = isValid && cantidad > 0 ? areaTotal / anchoRollo : 0;
  const metrosSobrantes = isValid && cantidad > 0 ? largoRollo - metrosUsados : 0;
  const mangasPorRollo = isValid && areaManga > 0 ? Math.floor((anchoRollo * largoRollo) / areaManga) : 0;

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans py-10 px-4">
      <div className="max-w-3xl mx-auto shadow-lg rounded-2xl border border-gray-200 p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-700">Calculadora de Tela para Mangas</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 font-semibold">Cantidad de mangas</label>
            <input type="number" value={cantidad} onChange={(e) => setCantidad(Number(e.target.value))} className="w-full border border-gray-300 p-2 rounded-md shadow-sm" />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Largo de manga (m)</label>
            <input type="number" value={largo} onChange={(e) => setLargo(Number(e.target.value))} className="w-full border border-gray-300 p-2 rounded-md shadow-sm" />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Diámetro de manga (m)</label>
            <input type="number" value={diametro} onChange={(e) => setDiametro(Number(e.target.value))} className="w-full border border-gray-300 p-2 rounded-md shadow-sm" />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Ancho del rollo (m)</label>
            <input type="number" value={anchoRollo} onChange={(e) => setAnchoRollo(Number(e.target.value))} className="w-full border border-gray-300 p-2 rounded-md shadow-sm" />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Largo del rollo (m)</label>
            <input type="number" value={largoRollo} onChange={(e) => setLargoRollo(Number(e.target.value))} className="w-full border border-gray-300 p-2 rounded-md shadow-sm" />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          <label className="flex items-center gap-2 font-medium">
            <input type="checkbox" checked={tapa} onChange={(e) => setTapa(e.target.checked)} />
            <span>Con tapa</span>
          </label>
          <label className="flex items-center gap-2 font-medium">
            <input type="checkbox" checked={refuerzo} onChange={(e) => setRefuerzo(e.target.checked)} />
            <span>Con refuerzo</span>
          </label>
          <label className="flex items-center gap-2 font-medium">
            <input type="checkbox" checked={snapband} onChange={(e) => setSnapband(e.target.checked)} />
            <span>Con snapband</span>
          </label>
          <label className="flex items-center gap-2 font-medium">
            <input type="checkbox" checked={faldon} onChange={(e) => setFaldon(e.target.checked)} />
            <span>Con faldón</span>
          </label>
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => setMostrar(true)}
            className="bg-blue-400 hover:bg-blue-500 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition"
          >
            Calcular
          </button>
        </div>

        {mostrar && (
          <div className="mt-10 bg-blue-50 border border-blue-200 p-6 rounded-xl">
            {isValid ? (
              <div className="space-y-2 text-lg">
                <p><strong>Área por manga:</strong> {areaManga.toFixed(3)} m²</p>
                <p><strong>Cantidad de mangas posibles por rollo:</strong> {mangasPorRollo}</p>
                {cantidad > 0 && (
                  <>
                    <p><strong>Área total:</strong> {areaTotal.toFixed(3)} m²</p>
                    <p><strong>Metros lineales usados:</strong> {metrosUsados.toFixed(2)} m</p>
                    <p><strong>Metros lineales sobrantes:</strong> {metrosSobrantes.toFixed(2)} m</p>
                  </>
                )}
              </div>
            ) : (
              <p className="text-red-600 font-semibold">⚠️ Por favor, completa todos los campos correctamente.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
