import { Repository, getRepository } from "typeorm";
import { PeliculaDAO } from "../entities/Index";

export default class Categoria {
    private peliculaId: number;
    private titulo: string;
    private descripcion: string;
    private trailerUrl: string;
    private duracion: string;
    private estreno: string;
    private caratula: string;

    private repository: Repository<PeliculaDAO>;    

    /**
     * Getter peliculaId
     * @return {number}
     */
	public getPeliculaId(): number {
		return this.peliculaId;
	}

    /**
     * Getter titulo
     * @return {string}
     */
	public getTitulo(): string {
		return this.titulo;
	}

    /**
     * Getter descripcion
     * @return {string}
     */
	public getDescripcion(): string {
		return this.descripcion;
	}

    /**
     * Getter trailerUrl
     * @return {string}
     */
	public getTrailerUrl(): string {
		return this.trailerUrl;
	}

    /**
     * Getter duracion
     * @return {string}
     */
	public getDuracion(): string {
		return this.duracion;
	}

    /**
     * Getter estreno
     * @return {string}
     */
	public getEstreno(): string {
		return this.estreno;
	}

    /**
     * Setter peliculaId
     * @param {number} value
     */
	public setPeliculaId(value: number) {
		this.peliculaId = value;
	}

    /**
     * Setter titulo
     * @param {string} value
     */
	public setTitulo(value: string) {
		this.titulo = value;
	}

    /**
     * Setter descripcion
     * @param {string} value
     */
	public setDescripcion(value: string) {
		this.descripcion = value;
	}

    /**
     * Setter trailerUrl
     * @param {string} value
     */
	public setTrailerUrl(value: string) {
		this.trailerUrl = value;
	}

    /**
     * Setter duracion
     * @param {string} value
     */
	public setDuracion(value: string) {
		this.duracion = value;
	}

    /**
     * Setter estreno
     * @param {string} value
     */
	public setEstreno(value: string) {
		this.estreno = value;
	}


    /**
     * Getter caratula
     * @return {string}
     */
	public getCaratula(): string {
		return this.caratula;
	}


    /**
     * Setter caratula
     * @param {string} value
     */
	public setCaratula(value: string) {
		this.caratula = value;
	}

  
    constructor(init?: Partial<PeliculaDAO>) {
        Object.assign(this, init);
        this.repository = getRepository(PeliculaDAO);
    }

    public async add(){
        if(!this.caratula || ! this.descripcion || !this.duracion || !this.estreno)
            throw new Error("La informacion suministrada es invalida");

        try {
            const newMovie = this.repository.create(Object.assign(this));
            const results = await this.repository.save(newMovie);
            Object.assign(this, results);

            return results;
        } catch (error) {
            throw new Error("Ha ocurrido un problema desconocido intenta mas tarde");
        }
    }

    public async setCategorias(categorias: Array<number>){
        try {
             await this.repository.createQueryBuilder()
             .relation(PeliculaDAO, "categorias")
             .of(this)
             .add(categorias);
             
        } catch (error) {
            throw new Error("Ha ocurrido un problema desconocido intenta mas tarde");
        }
   }

    public async getList(titulo?: string, categorias?: string[]){
        try {
            const peliculas = this.repository.createQueryBuilder("pelicula")
            .leftJoinAndSelect("pelicula.categorias", "pelicula.categorias")

            if(titulo){
                peliculas
                .andWhere("titulo LIKE :search", { search:`%${titulo}%` });
            }

            if(categorias){
                peliculas
                .leftJoin("filtros", "filtros", "filtros.peliculaId = pelicula.peliculaId")
                .andWhere(`filtros.categoriaId IN (:ids)`, {ids: categorias})
            }

            return peliculas.cache(true).getMany();
        } catch (error) {
            throw new Error("Ha ocurrido un problema desconocido intenta mas tarde");
        }
    }

    public async getNewer(){
        try {
            const peliculas = await this.repository.createQueryBuilder("pelicula")
            .where("DATEDIFF(CURRENT_DATE,estreno) <= 21")
            .getMany();
        
            return peliculas;
    
        } catch (error) {
            throw new Error("Ha ocurrido un problema desconocido intenta mas tarde");
        }
    }

}