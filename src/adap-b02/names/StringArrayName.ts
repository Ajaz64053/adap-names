import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export class StringArrayName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;
    protected components: string[] = [];
    

    constructor(source: string[], delimiter?: string) {
        this.delimiter = delimiter ? delimiter : DEFAULT_DELIMITER;
        this.components = [...source];
    }

    public asString(delimiter: string = this.delimiter): string {
        return this.components.join(delimiter);
    }

    public asDataString(): string {
        return this.components.map(c => 
            c.split(ESCAPE_CHARACTER).join(ESCAPE_CHARACTER + ESCAPE_CHARACTER)
             .split(this.delimiter).join(ESCAPE_CHARACTER + this.delimiter)
        ).join(this.delimiter);
        
        
            
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    public isEmpty(): boolean {
        return this.components.length === 0;
    }

    public getNoComponents(): number {
        return this.components.length;
    }

    public getComponent(i: number): string {
        const component = this.components[i];
        if (component !== undefined) {
            return component;   
        } else {
            throw new Error("Component index out of bounds");
        
        }
    }

    public setComponent(i: number, c: string): void {
        const component = this.components[i];
        if (component === undefined) {
            throw new Error("Component index out of bounds");
        }
        this.components[i] = c;
    }

    public insert(i: number, c: string): void {
        if (i < 0 || i > this.components.length) {
            throw new Error("Component index out of bounds");
        }
        this.components.splice(i, 0, c);
    }

    public append(c: string): void {
        this.components.push(c);
    }

    public remove(i: number): void {
        if (i < 0 || i >= this.components.length) {
            throw new Error("Component index out of bounds");
        }
        this.components.splice(i, 1);
    }

    public concat(other: Name): void {
        for(let i = 0; i < other.getNoComponents(); i++) {
            this.append(other.getComponent(i));
        }
    }

}