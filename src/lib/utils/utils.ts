import {type ClassValue, clsx} from "clsx";
import {nanoid} from "nanoid";
import {twMerge} from "tailwind-merge";

// возвращает слитые css классы
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// возвращает сгенерированный уникальный id
export function genId(size: number = 4): string {
    return nanoid(size);
}

// возвращает первый символы первых двух слов в верхнем регистре
export function getInitials(name: string): string {
    const nameArray = name.trim().split(" ");

    return `${nameArray[0][0] + nameArray[1][0]}`.toUpperCase();
}

// обновляет url параметр
export function updateUrlParam(
    key: string,
    value: string | null,
    replace = false
) {
    const params = new URLSearchParams(window.location.search);

    if (params) {
        if (value === null) {
            params.delete(key);
        } else {
            params.set(key, value);
        }

        const newUrl = `${window.location.pathname}?${params.toString()}`;

        if (replace) {
            window.history.replaceState(null, "", newUrl);
        } else {
            window.history.pushState(null, "", newUrl);
        }
    }
}
