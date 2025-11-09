import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export class StringName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;
    protected name: string = "";
    protected noComponents: number = 0;

    constructor(source: string, delimiter?: string) {
        this.delimiter = delimiter ? delimiter : DEFAULT_DELIMITER;
        this.nocomponents = this.name = source;
    }

    public asString(delimiter: string = this.delimiter): string {
        return this.name.split(this.delimiter).join(delimiter);

    }

    public asDataString(): string {
        return this.name.split(ESCAPE_CHARACTER).join(ESCAPE_CHARACTER + ESCAPE_CHARACTER)
            .split(this.delimiter).join(ESCAPE_CHARACTER + this.delimiter);   

    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    public isEmpty(): boolean {
        return this.noComponents === 0;
    }

    public getNoComponents(): number {
        const components = this.name.split(this.delimiter);
        return components.length;
    }

    public getComponent(x: number): string {
        const components = this.name.split(this.delimiter);
        const component = components[x];
        if (component !== undefined) {
            return component;   
        } else {
            throw new Error("Component index out of bounds");
        }
    }

    public setComponent(n: number, c: string): void {
        const components = this.name.split(this.delimiter);
        if (components[n] === undefined) {
            throw new Error("Component index out of bounds");
        }
        components[n] = c;
        this.name = components.join(this.delimiter);
    }

    public insert(n: number, c: string): void {
        const components = this.name.split(this.delimiter);
        components.splice(n, 0, c);
        this.name = components.join(this.delimiter);
        this.noComponents = components.length;
    }

    public append(c: string): void {
        const components = this.name.split(this.delimiter);
        components.push(c);
        this.name = components.join(this.delimiter);
        this.noComponents = components.length;
    }

    public remove(n: number): void {
        const components = this.name.split(this.delimiter);
        components.splice(n, 1);
        this.name = components.join(this.delimiter);
        this.noComponents = components.length;
    }

    public concat(other: Name): void {
        for (let i = 0; i < other.getNoComponents(); i++) {
            this.append(other.getComponent(i));
        }
    }

}