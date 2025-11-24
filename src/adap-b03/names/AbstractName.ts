import { a } from "vitest/dist/chunks/suite.d.FvehnV49";
import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export abstract class AbstractName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    constructor(delimiter: string = DEFAULT_DELIMITER) {
        this.delimiter = delimiter;
    }

    public clone(): Name {
        throw new Error("Clone method needs implementation in subclass");
        
    }

    public asString(delimiter: string = this.delimiter): string {
        const components: string[] = [];
        for (let i = 0; i < this.getNoComponents(); i++) {
            components.push(this.getComponent(i));
        }   
        return components.join(delimiter);
    }

    public toString(): string {
        return this.asDataString();
    }

    public asDataString(): string {
        const components: string[] = [];
        for (let i = 0; i < this.getNoComponents(); i++) {
            const c = this.getComponent(i);
            components.push(
                c.split(ESCAPE_CHARACTER).join(ESCAPE_CHARACTER + ESCAPE_CHARACTER)
                 .split(this.delimiter).join(ESCAPE_CHARACTER + this.delimiter)
            );
        }   
        return components.join(this.delimiter);
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
        return this.asString(this.delimiter).split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    }

    public isEmpty(): boolean {
        return this.getNoComponents() === 0;
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    abstract getNoComponents(): number;

    abstract getComponent(i: number): string;
    abstract setComponent(i: number, c: string): void;

    abstract insert(i: number, c: string): void;
    abstract append(c: string): void;
    abstract remove(i: number): void;

    public concat(other: Name): void {
        for (let i = 0; i < other.getNoComponents(); i++) {
            this.append(other.getComponent(i));
        }
    }

}