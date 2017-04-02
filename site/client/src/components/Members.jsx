import React from 'react'

const Members = (props) => {

  const members = props.members;
  console.log('members', members);

  return(
      <div className="membershipPage">
          <p style={{color: "red", marginTop: "", fontFamily: "Great Vibes", fontSize: "65px", height: "100px"}}>Museum Members</p>
          <ul className="member">
            {
              members && members.map(member => {
                return (
                  <li className="memberslist"style={{color: "black", height: "30px", fontSize:"24px"}} key={member.id}>
                    <div className="membername">{`${member.first} ${member.last}`}</div>
                    <div className="memberdate">{`${member.date}`}</div>
                  </li>
                )
              })
            }
          </ul>
      </div>
  )
}

export default Members;
