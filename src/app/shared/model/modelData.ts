export const horasprevision = [{ intervalo: '08:00-19:59', hora: '10:00' }, { intervalo: '20:00-07:59', hora: '22:00' }];
export const horasolar = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00'];

export const temperaturaAire = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00'];
export const humedadRelativa = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00'];
export const pendiente = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00'];

export const lineasEncendido: LineasEncendido[] = [
    { valor: '2', ponderaVelocidadPropagacion: 1, ponderaLongitudLlama: 1 },
    { valor: '3', ponderaVelocidadPropagacion: 1, ponderaLongitudLlama: 1 },
    { valor: '4', ponderaVelocidadPropagacion: 1.44, ponderaLongitudLlama: 1.28 },
    { valor: '5', ponderaVelocidadPropagacion: 1.5, ponderaLongitudLlama: 1.3 },
    { valor: '>6', ponderaVelocidadPropagacion: 1.5, ponderaLongitudLlama: 1.3 },
];

export const distanciaHorizontalPuntos: DistanciaPuntos[] = [
    { valor: '0.5', ponderaVelocidadPropagacion: 0.95, ponderaLongitudLlama: 0.9 },
    { valor: '1', ponderaVelocidadPropagacion: 0.6, ponderaLongitudLlama: 0.72 },
    { valor: '1.5', ponderaVelocidadPropagacion: 0.35, ponderaLongitudLlama: 0.6 },
    { valor: '2', ponderaVelocidadPropagacion: 0.2, ponderaLongitudLlama: 0.55 },
    { valor: '2.5', ponderaVelocidadPropagacion: 0.15, ponderaLongitudLlama: 0.5 },
    { valor: '3', ponderaVelocidadPropagacion: 0.12, ponderaLongitudLlama: 0.5 },
];

export const distanciaEntreFajas: DistanciaPuntos[] = [
    { valor: '1.5', ponderaVelocidadPropagacion: 1, ponderaLongitudLlama: 1 },
    { valor: '2', ponderaVelocidadPropagacion: 1.2, ponderaLongitudLlama: 1.1 },
    { valor: '4', ponderaVelocidadPropagacion: 2.2, ponderaLongitudLlama: 1.5 },
    { valor: '6', ponderaVelocidadPropagacion: 2.6, ponderaLongitudLlama: 1.7 },
    { valor: '8', ponderaVelocidadPropagacion: 3.2, ponderaLongitudLlama: 1.9 },
    { valor: '10', ponderaVelocidadPropagacion: 3.5, ponderaLongitudLlama: 2 },
];


export class LineasEncendido {
    valor: string;
    ponderaVelocidadPropagacion: number;
    ponderaLongitudLlama: number;
}

export class DistanciaPuntos {
    valor: string;
    ponderaVelocidadPropagacion: number;
    ponderaLongitudLlama: number;
}