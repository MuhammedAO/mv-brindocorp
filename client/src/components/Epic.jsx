import React from "react"


const Epic = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "3rem" }}>
      <a href="https://www.epicgames.com/id/authorize?client_id=xyza7891RUAfh61kSyi9VbDk3xxhZze5&redirect_uri=https://desolate-stream-26858.herokuapp.com/api/epic&response_type=code&scope=basic_profile" target="_blank" rel="noreferrer">
        Connect to Epic
      </a>
    </div>
  )
}

export default Epic
