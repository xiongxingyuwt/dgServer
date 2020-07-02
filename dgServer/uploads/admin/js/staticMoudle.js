// 返回模板 管理员的模板
function adddata(options){
    let str = ''
    options.forEach((item,index,options)=>{
            str += `<tr>
                      <td>
                        <input type="checkbox" name=""  lay-skin="primary">
                      </td>
                      <td>${ index}</td>
                      <td>${item.adminname}</td>
                      <td>${item.adminPhone}</td>
                      <td>${item.adminEmail}</td>
                      <td>${item.adminGrade}</td>
                      <td>${new Date(item.adcreatetime).toLocaleString()}</td>
                      <td class="td-status">
                        <span class="layui-btn layui-btn-normal layui-btn-mini">${item.adstatus === 0 ? '已启用':'未启用'}</span></td>
                      <td class="td-manage">
                        <a onclick="member_stop(this,${item.adminPhone})" href="javascript:;"  title="启用">
                          <i class="layui-icon">&#xe601;</i>
                        </a>
                        <a title="编辑"  onclick="xadmin.open('编辑','admin-edit.html')" href="javascript:;">
                          <i class="layui-icon">&#xe642;</i>
                        </a>
                        <a title="删除" onclick="member_del(this,${item.adminPhone})" href="javascript:;">
                          <i class="layui-icon">&#xe640;</i>
                        </a>
                      </td>
                    </tr>`
    })
    return str;
}