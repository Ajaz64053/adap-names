import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringName extends AbstractName {
    protected name: string = "";
    protected noComponents: number = 0;

    constructor(source: string, delimiter?: string) {
        super(delimiter || DEFAULT_DELIMITER);
        this.name = source;
    }

    protected createInstanceFromString(source: string, delimiter: string): Name {
        return new StringName(source, delimiter);
    }

    public clone(): Name {
        return new StringName(this.name, this.delimiter);
    }

    public asString(delimiter: string = this.delimiter): string {
        const components = this.parseComponents(this.name);
        return components.join(delimiter);
    }

    public asDataString(): string {
        const components = this.parseComponents(this.name);
        return components
            .map(c =>
                c.split(ESCAPE_CHARACTER).join(ESCAPE_CHARACTER + ESCAPE_CHARACTER)
                    .split(this.delimiter).join(ESCAPE_CHARACTER + this.delimiter)
            )
            .join(this.delimiter);
    }

    public isEqual(other: Name): boolean {
        if (this.getNoComponents() !== other.getNoComponents()) {
            return false;
        }
        for (let i = 0; i < this.getNoComponents(); i++) {
            if (this.getComponent(i) !== other.getComponent(i)) {
                return false;
            }
        }
        return true;
    }

    public getHashCode(): number {
        return this.name
            .split("")
            .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    }

    public isEmpty(): boolean {
        return this.name.length === 0;
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    public getNoComponents(): number {
        return this.parseComponents(this.name).length;
    }

    public getComponent(i: number): string {
        const components = this.parseComponents(this.name);
        if (i < 0 || i >= components.length) {
            throw new Error("Index out of bounds");
        }
        return components[i];
    }

    public setComponent(i: number, c: string): void {
        const components = this.parseComponents(this.name);
        if (i < 0 || i >= components.length) {
            throw new Error("Index out of bounds");
        }
        components[i] = c;
        this.name = components.join(this.delimiter);
    }

    public insert(i: number, c: string): void {
        const components = this.parseComponents(this.name);
        if (i < 0 || i > components.length) {
            throw new Error("Index out of bounds");
        }
        components.splice(i, 0, c);
        this.name = components.join(this.delimiter);
    }

    public append(c: string): void {
        const components = this.parseComponents(this.name);
        components.push(c);
        this.name = components.join(this.delimiter);
    }

    public remove(i: number): void {
        const components = this.parseComponents(this.name);
        if (i < 0 || i >= components.length) {
            throw new Error("Index out of bounds");
        }
        components.splice(i, 1);
        this.name = components.join(this.delimiter);
    }

    public concat(other: Name): void {
        const components = this.parseComponents(this.name);
        for (let i = 0; i < other.getNoComponents(); i++) {
            components.push(other.getComponent(i));
        }
        this.name = components.join(this.delimiter);
    }

    // 🔹 Helper function to correctly split string with escape logic
    private parseComponents(source: string): string[] {
        const result: string[] = [];
        let current = "";
        let escaping = false;

        for (const char of source) {
            if (escaping) {
                current += char;
                escaping = false;
            } else if (char === ESCAPE_CHARACTER) {
                escaping = true;
            } else if (char === this.delimiter) {
                result.push(current);
                current = "";
            } else {
                current += char;
            }
        }

        result.push(current);
        return result;
    }
}
