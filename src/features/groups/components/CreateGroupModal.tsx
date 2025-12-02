import React, {useState} from "react";
import { useGroupStore } from "../store";
import { Button } from "../../../components/ui/Button/Button/Button";

interface Props{
    isOpen: string;
    onClose: () => void;
}