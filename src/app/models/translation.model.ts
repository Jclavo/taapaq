import { TranslationDetail } from "./translation-detail.model";

export class Translation{
    id: number = 0;
    key: string = '';
    translationable_id: number = 0;
    model_id: number = 0;
    details: Array<Translation> = [];
}