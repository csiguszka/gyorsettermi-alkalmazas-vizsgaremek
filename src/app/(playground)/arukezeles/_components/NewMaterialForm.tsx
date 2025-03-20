"use client"

import { Material } from '@/app/model/material-model'
import React from 'react'
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormEvent, useEffect, useState } from "react";



function NewMaterialForm({material, handleCreate}:   {material: Material, handleCreate: (d: Material) => void}) {
    useEffect(() => {
        setUnit(material.unit);
        setError("");
        setName(material.name);
        setEnglishName(material.englishName);
        setIsloading(false);
    }, [material]);
    
    const [unit, setUnit] = useState<string>(material.unit || "");
    const [error, setError] = useState<string>("");
    const [name, setName] = useState<string>(material.name);
    const [englishName, setEnglishName] = useState<string>(material.englishName);
    const [isLoading, setIsloading] = useState(false);

    const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newMaterial: Material = {
        name: name,
        englishName: englishName,
        unit: unit,
    };
    handleCreate(newMaterial)
    setIsloading(false);
    };

    return (
    <Card className="card max-w-full lg:w-1/3">
        <CardHeader>
        <h2 className="text-center">
            {material.name ? material.name : "Új alapanyag"}
        </h2>
        <form
            className="flex flex-col gap-2"
            onSubmit={(e) => handleFormSubmit(e)}
        >
            <div>
            <Label>Név</Label>
            <Input
                placeholder="Név"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            </div>
            <div>
            <Label>Angol név</Label>
            <Input
                placeholder="Angol név"
                value={englishName}
                onChange={(e) => setEnglishName(e.target.value)}
            />
            </div>
            <div>
            <Label>Mértékegység</Label>
            <Input
                placeholder="Mértékegység"
                value={unit}
                onChange={(e) => {
                setError("");
                setUnit(e.target.value);
                }}
            />
            </div>
            {error && <p className="text-destructive">{error}</p>}
            <div className="flex flex-row justify-between">
            <Button
                className="btn"
                type="submit"
                onClick={() => setIsloading(true)}
            >
                Mentés {isLoading && <Loading />}
            </Button>
            </div>
        </form>
        </CardHeader>
    </Card>
    );
}

export default NewMaterialForm