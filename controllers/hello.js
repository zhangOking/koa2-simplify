let fn_hello = async(ctx, next) => {
    var name = ctx.request.query.name;
    ctx.response.body = `<h1>Hello, ${name}!</h1>`;
};

module.exports = {
    'GET /hello': fn_hello
}