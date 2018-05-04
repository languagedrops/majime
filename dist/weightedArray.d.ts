export interface ElementAndWeight<T> {
    element: T;
    weight: number;
}
export declare const getRandomWeightedElement: <T>(fromArray: ElementAndWeight<T>[]) => T | null;
