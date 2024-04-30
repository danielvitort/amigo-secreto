import { Group } from "@/types/Group"
import * as api from "@/api/admin";
import { useEffect, useState } from "react";
import { ErrorItem, getErrorFromZod } from "@/utils/getErrorFromZod";
import { z } from "zod";
import { InputField } from "../InputField";
import { Button } from "../Button";

type Props = {
    group: Group;
    refreshAction: () => void;
}
export const GroupEdit = ({ group, refreshAction }: Props) => {
    const [nameField, setNameField] = useState(group.name);
    const [errors, setErrors] = useState<ErrorItem[]>([]);
    const [loading, setLoading] = useState(false);

    const groupSchema = z.object({
        nameField: z.string().min(1, 'Preencha o nome')
    });

    useEffect(() => {
        setErrors([]);
        const data = groupSchema.safeParse({ nameField });
        if (!data.success) setErrors(getErrorFromZod(data.error));
    }, [nameField]);

    const handleSaveButton = async () => {
        if (errors.length > 0) return;

        setLoading(true);
        const updateGroup = await api.updateGroup(group.id_event, group.id, {
            name: nameField
        });
        setLoading(false);
        if (updateGroup) {
            refreshAction();
        } else {
            alert('Ocorreu um erro');
        }
    }

    return (
        <div>
            <h4 className="text-xl">Editar Grupo</h4>
            <InputField
                value={nameField}
                onChange={e => setNameField(e.target.value)}
                placeholder="Digite o nome do Grupo"
                errorMessage={errors.find(item => item.field === 'nameField')?.message}
                disabled={loading}
            />
            <div className="flex gap-3">
                <Button value="Cancelar" disabled={loading} onClick={() => refreshAction()} />
                <Button value={loading ? "Salvando..." : "Salvar"} disabled={loading} onClick={handleSaveButton} />
            </div>
        </div>
    )
}