import { connect } from 'react-redux';
import Members from '../components/Members'

const mapStateToProps = (state) => {
  console.log('members state', state);
  return {
    members: state.members.allVisitors
  }
}

const MembersContainer = connect(mapStateToProps)(Members)
export default MembersContainer
