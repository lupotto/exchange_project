import React, { Component } from 'react'
import { connect } from 'react-redux'

class Trades extends Component {
  render(){
    return (
      <div className="card bg-dark text-white">
        <div className="card-header">
          Card Title
        </div>
        <div className="card-body">
          <table className="table table-dark table-sm small">
              <thead>
                <tr>
                  <th >Time</th>
                  <th >ALEX</th>
                  <th >ALEX/ETH</th>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </thead>
            </table>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    // TODO: Fill me in...
  }
}

export default connect(mapStateToProps)(Trades)
