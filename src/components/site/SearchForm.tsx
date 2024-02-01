"use client"

import { escapeCPF } from "@/utils/escapeCPF";
import { useState } from "react";

type Props = {
    onSearchButton: (cpf: string) => void;
    loading: boolean;
}

export const SearchForm = ({ onSearchButton, loading }: Props) => {
    const [cpfInput, setCpfInput] = useState('');

    return (
        <div>
            <p>Qual seu CPF?</p>
            <input 
                type="text"
                inputMode="numeric"
                placeholder="Digite seu CPF"
                className="w-full p-3 bg-white text-black text-center text-4xl outline-none rounded-lg disabled:opacity-50"
                autoFocus
                value={cpfInput}
                onChange={e => setCpfInput(escapeCPF(e.target.value))}
                disabled={loading}
            />
            <button
                className="w-full p-3 mt-3 rounded-lg bg-blue-800 text-white text-4xl border-b-4 border-blue-600 active:border-blue-800 disabled:opacity-50"
                onClick={() => onSearchButton(cpfInput)}
                disabled={loading}
            >{loading ? "Buscando..." : "Entrar"}</button>
        </div>
    )
}