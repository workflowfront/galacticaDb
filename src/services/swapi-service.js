export default class SwapiService {

  _apiBase = 'https://swapi.dev/api';;
  _imageBase = 'https://starwars-visualguide.com/assets/img';

  getResource = async (url) => {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}` +
        `, received ${res.status}`)
    }
    return await res.json();
  };

  getAllPeople = async () => {
    const res = await this.getResource(`/people/`);
    return res.results
      .map(this._transformPerson)
      .slice(0, 5);
  };

  getPerson = async (id) => {
    const person = await this.getResource(`/people/${id}/`);
    return this._transformPerson(person);
  };

  getAllPlanets = async () => {
    const res = await this.getResource(`/planets/`);
    return res.results
      .map(this._transformPlanet)
      .slice(0, 5);
  };

  getPlanet = async (id) => {
    const planet = await this.getResource(`/planets/${id}/`);
    return this._transformPlanet(planet);
  };

  getAllGalacticaships = async () => {
    const res = await this.getResource(`/galacticaships/`);
    return res.results
      .map(this._transformGalacticaship)
      .slice(0, 5);
  };

  getGalacticaship = async (id) => {
    const galacticaship = await this.getResource(`/galacticaships/${id}/`);
    return this._transformGalacticaship(galacticaship);
  };

  getPersonImage = ({id}) => {
    return `${this._imageBase}/characters/${id}.jpg`
  };

  getGalacticashipImage = ({id}) => {
    return `${this._imageBase}/galacticaships/${id}.jpg`
  };

  getPlanetImage = ({id}) => {
    return `${this._imageBase}/planets/${id}.jpg`
  };

  _extractId = (item) => {
    const idRegExp = /\/([0-9]*)\/$/;
    return item.url.match(idRegExp)[1];
  };

  _transformPlanet = (planet) => {
    return {
      id: this._extractId(planet),
      name: planet.name,
      population: planet.population,
      rotationPeriod: planet.rotation_period,
      diameter: planet.diameter
    };
  };

  _transformGalacticaship = (galacticaship) => {
    return {
      id: this._extractId(galacticaship),
      name: galacticaship.name,
      model: galacticaship.model,
      manufacturer: galacticaship.manufacturer,
      costInCredits: galacticaship.cost_in_credits,
      length: galacticaship.length,
      crew: galacticaship.crew,
      passengers: galacticaship.passengers,
      cargoCapacity: galacticaship.cargo_capacity
    }
  };

  _transformPerson = (person) => {
    return {
      id: this._extractId(person),
      name: person.name,
      gender: person.gender,
      birthYear: person.birth_year,
      eyeColor: person.eye_color
    }
  }
}
