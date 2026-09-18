import marcelo from "../../../assets/teachers/professor-marcelo.png";
import luani from "../../../assets/teachers/professora-luani.jpeg";

export const teachers = [
  {
    id: 1,
    image: marcelo,
    name: "Marcelo",
    role: "Professor e Diretor de Teatro",
    experience: experienceYears(2010),
    bio: `Há mais de ${experienceYears(2010)} anos, utiliza o teatro como ferramenta de desenvolvimento humano, ajudando crianças e adolescentes a descobrirem confiança, criatividade e trabalho em equipe através da arte.`
  },

  {
    id: 2,
    image: luani,
    name: "Luani",
    role: "Professora de Teatro e Intérprete de Libras",
    experience: experienceYears(2020),
    bio: "Une o teatro e a Libras para criar experiências acolhedoras e inclusivas, acreditando que a arte deve ser um espaço onde todos possam se expressar, aprender e pertencer."
  },
  
];

function experienceYears(startDate){
  const today = new Date()
  return today.getFullYear() - startDate
};