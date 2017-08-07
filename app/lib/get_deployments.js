var query = require('./query'),
    util = require('./util');

module.exports = query.prepare(
    'deployments',
    'deployments',
    function(ctx){
        return `SELECT r.request_id, r.brief, r.detailed as description
                FROM request r
                JOIN usr u ON u.user_no=r.requester_id
                WHERE u.org_code=${ctx.org}
                    AND r.system_id IN (${ctx.sys.join(',')})
                    AND (r.brief like '%${ctx.year + '' +ctx.month}%' OR r.brief like '%${ctx.year+'0'+ctx.month}%' OR r.brief like '%${ctx.period}%')
                    AND r.brief like '%eployment%'`;
    },
    function(data, ctx, next){
        next(data.rows);
    }
)
