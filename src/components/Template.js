import React, { Component } from 'react'
import { connect } from 'react-redux'

class Template extends Component{
  render(){
    return (

    )
  }
}

function mapStateToProps(state){
  return {
    <div className="card bg-dark text-white">
      <div className="card-header">
        Template
      </div>
      <div className="card-body">

      </div>
    </div>
  }
}

export default connect(mapStateToProps)(Template)
