import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export class StringName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;
    protected name: string = "";
    protected noComponents: number = 0;

    constructor(source: string, delimiter?: string) {
        this.delimiter = delimiter ?? DEFAULT_DELIMITER;
        this.name = source;
    }

    public asString(delimiter: string = this.delimiter): string {
        return this.getComponents().join(delimiter);
    }

    public asDataString(): string {
        return this.getComponents().map(c =>
            c.split(ESCAPE_CHARACTER).join(ESCAPE_CHARACTER + ESCAPE_CHARACTER)
             .split(this.delimiter).join(ESCAPE_CHARACTER + this.delimiter)
        ).join(this.delimiter);
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    public isEmpty(): boolean {
        return this.getComponents().length === 0;
    }

    public getNoComponents(): number {
        return this.getComponents().length;
    }

    public getComponent(x: number): string {
        const components = this.getComponents();
        if (x < 0 || x >= components.length) {
            throw new Error("Component index out of bounds");
        }
        return components[x];
    }

    public setComponent(n: number, c: string): void {
        const components = this.getComponents();
        if (n < 0 || n >= components.length) {
            throw new Error("Component index out of bounds");
        }
        components[n] = c;
        this.name = this.composeName(components);
    }

    public insert(n: number, c: string): void {
        const components = this.getComponents();
        if (n < 0 || n > components.length) {
            throw new Error("Component index out of bounds");
        }
        components.splice(n, 0, c);
        this.name = this.composeName(components);
    }

    public append(c: string): void {
        const components = this.getComponents();
        components.push(c);
        this.name = this.composeName(components);
    }

    public remove(n: number): void {
        const components = this.getComponents();
        if (n < 0 || n >= components.length) {
            throw new Error("Component index out of bounds");
        }
        components.splice(n, 1);
        this.name = this.composeName(components);
    }

    public concat(other: Name): void {
        const components = this.getComponents();
        for (let i = 0; i < other.getNoComponents(); i++) {
            components.push(other.getComponent(i));
        }
        this.name = this.composeName(components);
    }

    private getComponents(): string[] {
        const result: string[] = [];
        let current = '';
        let escapeNext = false;
        for (const char of this.name) {
            if (escapeNext) {
                current += char;
                escapeNext = false;
            } else if (char === ESCAPE_CHARACTER) {
                escapeNext = true;
            } else if (char === this.delimiter) {
                result.push(current);
                current = '';
            } else {
                current += char;
            }
        }
        result.push(current);
        return result;
    }

    private composeName(components: string[]): string {
        return components.join(this.delimiter);
    }
}
