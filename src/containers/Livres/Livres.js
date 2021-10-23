import React, { Component } from "react";
import Livre from "./Livre/Livre";
import FormulaireAjout from './FormulaireAjout/FormulaireAjout';


class Livres extends Component {

    state = {
        livres: [
            { id: 1, titre: "l'algorithme selon H2PROG", auteur: "Mathieu Gaston", nbPages: 200 },
            { id: 2, titre: "Le Cameroun du 19eme", auteur: "Yannick Essola", nbPages: 500 },
            { id: 3, titre: "Le monde des animaux", auteur: "Francois Legrand", nbPages: 250 },
            { id: 4, titre: "L'ecole de l'élève", auteur: "Kierane Nouma", nbPages: 300 },
        ]
    }

    handleSuppressionLivre = (id) => {
        const livreIndexTab = this.state.livres.findIndex(l => {
            return l.id === id;
        })

        const newLivres = [...this.state.livres];
        newLivres.splice(livreIndexTab, 1);

        this.setState({ livres: newLivres });
    }

    render() {
        return (
            <>
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
                                return (
                                    <tr key={livre.id}>
                                        <Livre
                                            titre={livre.titre}
                                            auteur={livre.auteur}
                                            nbPages={livre.nbPages}
                                            suppression={() => this.handleSuppressionLivre(livre.id)}
                                        />
                                    </tr>
                                );
                            })
                        }

                    </tbody>

                </table>
                {this.props.ajoutLivre && <FormulaireAjout />}
            </>
        )
    }
}

export default Livres;