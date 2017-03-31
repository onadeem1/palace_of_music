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
                  <li style={{color: "black", height: "30px", fontSize:"24px"}} key={member.id}>
                    {`${member.first} ${member.last}............${member.date}`}
                  </li>
                )
              })
            }
          </ul>
      </div>
  )
}

export default Members;
