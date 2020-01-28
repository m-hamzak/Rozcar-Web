import React from "react";


const TimeInstance = ({ Member, field, googleLink, users, handleChange }) => {
  let contentPos;
  if (field[1] % 2 === 0) {
    contentPos = "content-right";
  } else {
    contentPos = "content-left";
  }
  //console.log(field[1], contentPos);
  return (
    <div className="timeline-article">
      <div className={`${contentPos}-container`}>
        <div className={`${contentPos}`}>
          <p>
            <span className="article-number">
              {" "}
              <select
                onChange={handleChange}
                value={Member}
                name={field}
                className="form-control"
              >
                <option value="None">None</option>
                {users.map(member => (
                  <option value={member.Name} key={member.Name}>
                    {member.Name}
                  </option>
                ))}
              </select>
            </span>
          </p>
        </div>
      </div>


      <div className="meta-date">
        <div className="date">

          <a href={`https://www.google.com/maps/dir/${googleLink.quards1}${googleLink.quards2}`} target="_blank"
            rel="noopener noreferrer"
          >  <i className="fa fa-map-marker" aria-hidden="true" />click here</a>
        </div>
      </div>
    </div>

  );
};

export default TimeInstance;