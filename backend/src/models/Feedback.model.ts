import { Repository, getRepository } from "typeorm";
import { FeedbackDAO } from "../entities/Index";

export default class Feedback {
    private feedbackId: number;
    private peliculaId: number;
    private calificacion: number;
    
    private repository: Repository<FeedbackDAO>;

    /**
     * Getter feedbackId
     * @return {number}
     */
	public getFeedbackId(): number {
		return this.feedbackId;
	}

    /**
     * Getter peliculaId
     * @return {number}
     */
	public getPeliculaId(): number {
		return this.peliculaId;
	}

    /**
     * Getter calificacion
     * @return {number}
     */
	public getCalificacion(): number {
		return this.calificacion;
	}

    /**
     * Setter feedbackId
     * @param {number} value
     */
	public setFeedbackId(value: number) {
		this.feedbackId = value;
	}

    /**
     * Setter peliculaId
     * @param {number} value
     */
	public setPeliculaId(value: number) {
		this.peliculaId = value;
	}

    /**
     * Setter calificacion
     * @param {number} value
     */
	public setCalificacion(value: number) {
		this.calificacion = value;
	}    
  
    constructor(init?: Partial<FeedbackDAO>) {
        Object.assign(this, init);
        this.repository = getRepository(FeedbackDAO);
    }

    public async getPuntuacion(){
        try {
            const results = await this.repository.query(`
                SELECT 
                    ROUND(AVG(feedback.calificacion), 2) AS 'calificacion',
                    COUNT(*) AS 'registros'
                FROM feedback
                WHERE feedback.peliculaId = ${this.peliculaId};
            `);

            results[0].calificacion = Number(results[0].calificacion);

            return results[0];
        } catch (error) {
            throw new Error("Ha ocurrido un problema desconocido intenta mas tarde");
        }
    }

    public async addFeedback() {
        if(this.calificacion > 5 || this.calificacion < 1){
          throw "La informacion ingresada no es valida";
        }
    
        try {
          const newReply = this.repository.create(Object.assign(this));
          const results = await this.repository.save(newReply);
          Object.assign(this, results);
          return results;
    
        } catch (error) {
          throw "Ha ocurrido un problema al tratar de hacer el comentario."
        }
      }

}