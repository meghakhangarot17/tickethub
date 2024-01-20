
export const Wrapper = (props) => {
   const {title} = props;
  return (
<div id='page d-flex flex-row'>
      <div id='image' style={{maxHeight: "450px", overflow: 'hidden'}}>
        <img className='w-100 overflow-hidden' src='https://blog.meetingpool.net/wp-content/uploads/2018/08/Ticketing-App-Startups.jpg' alt='website image' />
      </div>

      <div className="card">
  <div className="card-header">
  {title}
  </div>
  <div className="card-body">
  {props.children}
    </div>
    </div>
  </div>
  )
}