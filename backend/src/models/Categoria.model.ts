import { Repository, getRepository } from "typeorm";
import { CategoriaDAO } from "../entities/Index";

export default class Categoria {
    private categoriaId: number;
    private nombre: string;
    
    private repository: Repository<CategoriaDAO>;

    /**
     * Getter categoriaId
     * @return {number}
     */
    public getCategoriaId(): number {
        return this.categoriaId;
    }

    /**
     * Getter nombre
     * @return {string}
     */
    public getNombre(): string {
        return this.nombre;
    }

    /**
     * Setter categoriaId
     * @param {number} value
     */
    public setCategoriaId(value: number) {
        this.categoriaId = value;
    }

    /**
     * Setter nombre
     * @param {string} value
     */
    public setNombre(value: string) {
        this.nombre = value;
    }
  
    constructor(init?: Partial<CategoriaDAO>) {
        Object.assign(this, init);
        this.repository = getRepository(CategoriaDAO);
    }

    public async getAll(){
        try {
            const categorias = await this.repository.find();
            return categorias;
        } catch (error) {
            throw new Error("Ha ocurrido un problema desconocido intenta mas tarde");
        }
    }
}