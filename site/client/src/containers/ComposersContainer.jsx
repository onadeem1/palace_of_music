import { connect } from 'react-redux';
import Composers from '../components/Composers'

const mapStateToProps = (state) => {
  console.log('state', state);
  return {
    composers: state.composers.selectComposers
  }
}

const ComposersContainer = connect(mapStateToProps)(Composers)
export default ComposersContainer
