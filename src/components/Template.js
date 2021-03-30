import React, { Component } from 'react'
import { connect } from 'react-redux'

class Template extends Component{
  render(){
    return (
      <div className="card bg-dark text-white">
        <div className="card-header">
          Template
        </div>
        <div className="card-body">

        </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {

  }
}

export default connect(mapStateToProps)(Template)
