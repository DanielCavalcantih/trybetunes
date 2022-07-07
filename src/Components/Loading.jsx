import React from 'react';
import '../styles/loading.css';

class Loading extends React.Component {
  render() {
    return (
      <div className="containerLoading">
        <img className="imgLoading" src="https://olaargentina.com/wp-content/uploads/2019/11/loading-gif-transparent-10.gif" alt="" />
      </div>
      // <p>Carregando...</p>
    );
  }
}

export default Loading;
