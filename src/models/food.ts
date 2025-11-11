import { Schema, model } from "mongoose";

interface IFood {
  cod: number;
  nome: string;
  categoria_1: string;
  categoria_2: string;
  categoria_3: string;
  calorias: number;
  lipidos_g: number;
  acidos_gordos_saturados_g: number;
  acidos_gordos_trans_g: number;
  hidratos_carbono_g: number;
  acucares_g: number;
  Oligossacaridos: number;
  amido_g: number;
  fibra_g: number;
  proteinas_g: number;
  sal_g: number;
  alcool_g: number;
  agua_g: number;
  acidos_organicos_g: number;
  colestrol_mg: number;
  vitamina_a: number;
  caroteno: number;
  vitamina_d: number;
  alfa_tocoferol_mg: number;
  tiamina_mg: number;
  riboflavina_mg: number;
  niacina_mg: number;
  vitamina_b6: number;
  vitamina_b12: number;
  vitamina_c_mg: number;
  folatos: number;
  cinza_g: number;
  sodio_mg: number;
  postassio_mg: number;
  calcio_mg: number;
  fosforo_mg: number;
  magnesio_mg: number;
  ferro_mg: number;
  zinco_mg: number;
}

const foodSchema = new Schema<IFood>(
  {
    cod: { type: Number, required: true, index: true },
    nome: { type: String, required: true, index: true },
    categoria_1: String,
    categoria_2: String,
    categoria_3: String,
    calorias: Number,
    lipidos_g: Number,
    acidos_gordos_saturados_g: Number,
    acidos_gordos_trans_g: Number,
    hidratos_carbono_g: Number,
    acucares_g: Number,
    Oligossacaridos: Number,
    amido_g: Number,
    fibra_g: Number,
    proteinas_g: Number,
    sal_g: Number,
    alcool_g: Number,
    agua_g: Number,
    acidos_organicos_g: Number,
    colestrol_mg: Number,
    vitamina_a: Number,
    caroteno: Number,
    vitamina_d: Number,
    alfa_tocoferol_mg: Number,
    tiamina_mg: Number,
    riboflavina_mg: Number,
    niacina_mg: Number,
    vitamina_b6: Number,
    vitamina_b12: Number,
    vitamina_c_mg: Number,
    folatos: Number,
    cinza_g: Number,
    sodio_mg: Number,
    postassio_mg: Number,
    calcio_mg: Number,
    fosforo_mg: Number,
    magnesio_mg: Number,
    ferro_mg: Number,
    zinco_mg: Number,
  }
);

export const Food = model<IFood>("Food", foodSchema, "Food");