/* eslint-disable react/prop-types */
function Post(props){
    return (
      // post container
      <div style={{height: 400, width: 555, borderRadius: 10, backgroundColor: "white", margin: "0 auto"}}>
  
        {/* top level header for say - image and bio */}
        <div style={{display: "flex", padding: 10}}>
          <img src={props.img} style={{height: 50, width: 50, borderRadius: 50, marginRight: 10}} alt="post-profile" />
  
          <div>
            <div style={{fontSize: 16, fontWeight: 600}}>
              {props.name}
            </div>
            <div style={{fontSize: 14}}>
              {props.bio}
            </div>
            <div style={{fontSize: 12}}>
            {props.time}
            </div>
          </div>
        </div>
        
        {/* body */}
        <div>
          <div style={{padding: 10, lineHeight: 1.2}}>
            {props.body}
          </div>
          {props.bodyImg && <img src={props.bodyImg} style={{height: 200, width: 554 }} alt="BodyImg" />}
        </div>
      </div>
    )
}

export default Post;
