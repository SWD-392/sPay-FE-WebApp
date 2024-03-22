export async function POST(req) {
  const res = await req.json();
  const sesstionToken = res.payload?.data?.token;
  if (!sesstionToken) {
    return Response.json(
      { message: "Không nhận được session token" },
      {
        status: 400,
      }
    );
  }

  return Response.json(
    { res },
    {
      status: 200,
      headers: {
        "Set-Cookie": `sessionToken=${sesstionToken};`,
      },
    }
  );
}
