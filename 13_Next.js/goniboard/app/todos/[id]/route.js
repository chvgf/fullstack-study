export async function GET(req, { params }) {
  console.log(params.id);
  // Dynamic Route

  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${params.id}`);
  const todo = await res.json();

  return Response.json({ todo });
}