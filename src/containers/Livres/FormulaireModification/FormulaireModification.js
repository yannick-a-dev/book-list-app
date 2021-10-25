import React, {Component} from "react";
import Bouton from "../../../components/Bouton/Bouton";



class ModificationLivre extends Component {
    state = {
        titreSaisi: "",
        auteurSaisi: "",
        nbPagesSaisi: ""
      }

    componentDidMount = () => {
        this.setState({
            titreSaisi:this.props.titre,
            auteurSaisi:this.props.auteur,
            nbPagesSaisi:this.props.nbPages,
        })
    }

    handleValidation = () => {
        this.props.validationModification(this.props.id,this.state.titreSaisi,this.state.auteurSaisi,this.state.nbPagesSaisi);
    }
    render() {
        return (
          <>
             <td><input type="text" className="form-control" value={this.state.titreSaisi} onChange={(event) => this.setState({titreSaisi:event.target.value})} /></td>
             <td><input type="text" className="form-control" value={this.state.auteurSaisi} onChange={(event) => this.setState({auteurSaisi:event.target.value})} /></td>
             <td><input type="text" className="form-control" value={this.state.nbPagesSaisi} onChange={(event) => this.setState({nbPagesSaisi:event.target.value})} /></td>
             <td><Bouton typeBtn="btn-primary" clic={this.props.handleSubmit}>Valider</Bouton></td>
            
          </>
        );
    }
}

export default ModificationLivre;