import React, { Component } from "react";
import Livre from "./Livre/Livre";
import FormulaireAjout from './FormulaireAjout/FormulaireAjout';
import FormulaireModification from "./FormulaireModification/FormulaireModification";
import Alert from "../../components/Alert/Alert";


class Livres extends Component {

    state = {
        livres: [
            { id: 1, titre: "l'algorithme selon H2PROG", auteur: "Mathieu Gaston", nbPages: 200 },
            { id: 2, titre: "Le Cameroun du 19eme", auteur: "Yannick Essola", nbPages: 500 },
            { id: 3, titre: "Le monde des animaux", auteur: "Francois Legrand", nbPages: 250 },
            { id: 4, titre: "L'ecole de l'élève", auteur: "Kierane Nouma", nbPages: 300 },
        ],
        lastIdLivre : 4,
        idLivreAModifier : 0,
        alertMessage : null
    }

    handleSuppressionLivre = (id) => {
        const livreIndexTab = this.state.livres.findIndex(l => {
            return l.id === id;
        })

        const newLivres = [...this.state.livres];
        newLivres.splice(livreIndexTab, 1);

        this.setState({ 
            livres: newLivres,
            alertMessage: {
                message:"Suppression effectuée",
                type:"alert-danger"
            }
        });
    }

    handleAjoutLivre = (titre, auteur, nbPages) => {
       const newLivre = {
           id: this.state.lastIdLivre + 1, 
           titre: titre, 
           auteur: auteur, 
           nbPages:nbPages
        };

        const newListeLivres = [...this.state.livres];
        newListeLivres.push(newLivre);

        this.setState(oldState => {
            return {
                livres: newListeLivres,
                lastIdLivre: oldState.lastIdLivre + 1,
                alertMessage: {
                    message:"Ajout effectuée",
                    type: "alert-success"
                }
            }
        })
        this.props.fermerAjoutLivre();
    }

    handleModificationLivre = (id,titre,auteur,nbPages) => {
       const caseLivre = this.state.livres.findIndex(l => {
           return l.id === id;
       });

       const newLivre = {id,titre,auteur,nbPages};

       const newListe = [...this.state.livres];
       newListe[caseLivre] = newLivre;

       this.setState({
           livres : newListe,
           idLivreAModifier : 0,
           alertMessage: {
               message:"Modification effectuée",
               type: "alert-warning"
           }
       })
    }

    render() {
        return (
            <>
                {this.state.alertMessage && <Alert typeAlert={this.state.alertMessage.type}>{this.state.alertMessage.message}</Alert>}
                <table className="table text-center">
                    <thead>
                        <tr className="table-dark">
                            <th>Titre</th>
                            <th>Auteur</th>
                            <th>Nombre de pages</th>
                            <th colSpan="2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.livres.map(livre => {
                              if(livre.id !== this.state.idLivreAModifier){
                                return (
                                    <tr key={livre.id}>
                                        <Livre
                                            titre={livre.titre}
                                            auteur={livre.auteur}
                                            nbPages={livre.nbPages}
                                            suppression={() => this.handleSuppressionLivre(livre.id)}
                                            modification={() => this.setState({idLivreAModifier:livre.id})}
                                        />
                                    </tr>
                                );
                              } else {
                                  return(
                                    <tr key={livre.id}>
                                     <FormulaireModification 
                                     id={livre.id}
                                     titre={livre.titre}
                                     auteur={livre.auteur}
                                     nbPages={livre.nbPages}
                                     validationModification={this.handleModificationLivre}
                                  />
                                  </tr>
                                  )
                              }
                            })
                        }

                    </tbody>

                </table>
                {this.props.ajoutLivre && <FormulaireAjout validation = {this.handleAjoutLivre} />}
            </>
        )
    }
}

export default Livres;