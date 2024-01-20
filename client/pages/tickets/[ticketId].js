import Router from 'next/router';
import useRequest from '../../hooks/use-request';

const TicketShow = ({ ticket }) => {
  const { doRequest, errors } = useRequest({
    url: '/api/orders',
    method: 'post',
    body: {
      ticketId: ticket.id,
    },
    onSuccess: (order) =>
      Router.push('/orders/[orderId]', `/orders/${order.id}`),
  });

  return (
    <div class="mt-5 card">
  <div class="card-header">
    Ticket Details
  </div>
  <div class="card-body">
    <h5 class="card-title">Ticket Name: {ticket.title}</h5>
    <p class="card-text">Price: {ticket.price}</p>
    <button onClick={() => doRequest()} className="btn btn-primary">
       Purchase
    </button>
  </div>
  </div>
  );
};

TicketShow.getInitialProps = async (context, client) => {
  const { ticketId } = context.query;
  const { data } = await client.get(`/api/tickets/${ticketId}`);

  return { ticket: data };
};

export default TicketShow;
