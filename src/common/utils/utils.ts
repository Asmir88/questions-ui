import { HttpSuccessCodes } from "../enums/http-success-codes";

export interface ValidationRules {
    [key: string]: ValidationRule;
}

interface ValidationRule {
    isRequired?: ValidationParameters;
    minLength?: ValidationParameters;
    validEmail?: ValidationParameters
}

interface ValidationParameters {
    message: string;
    length?: number;
    pattern?: string;
}

export interface FormValidationResult {
    isValid: boolean;
    errors: FieldErrors | undefined;
}

export interface FieldErrors {
    [key: string]: FieldValidationResult;
}

interface FieldValidationResult {
    [key: string]: { message: string; }
}

export function isSuccess(status: number): boolean {
    return Object.values(HttpSuccessCodes).includes(status);
}

export function validate(formValue: any, rules: any): FormValidationResult {
    const fields = Object.keys(formValue);
    let isValid = true;

    let errors: FieldErrors = {};

    fields.forEach(field => {
        const rule = rules[field] as ValidationRule;

        if (rule) {
            const value = formValue[field];

            if (rule.isRequired && !value) {
                isValid = false;
                errors[field] = errors[field] || {};
                errors[field].isRequired = { message: rule.isRequired.message };
            }

            if (rule.minLength && value.length < rule.minLength.length!) {
                isValid = false;
                errors[field] = errors[field] || {};
                errors[field].minLength = { message: rule.minLength.message };
            }

            if (rule.validEmail && rule.validEmail.pattern) {
                const regEx = new RegExp(rule.validEmail.pattern);
                const isValidEmail = regEx.test(value);

                if (!isValidEmail) {
                    isValid = false;
                    errors[field] = errors[field] || {};
                    errors[field].validEmail = { message: rule.validEmail.message };
                }
            }
        }
    });

    return {
        isValid,
        errors
    } as FormValidationResult;
}

export function formatDate(date: Date) {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const minutesDisplay = minutes < 10 ? "0" +minutes : minutes;
    var strTime = hours + ":" + minutesDisplay;
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${strTime}`;
}

export function getDuplicatesById(arr: any[]): any[] {
    const mp = new Map(arr.map(x => [x.id, {...x, count: 0 }]));
    for (const {id} of arr) mp.get(id).count++;
    return Array.from(mp.values());
}
