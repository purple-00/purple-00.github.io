(function(){
    var canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9999';
    document.body.appendChild(canvas);
    var ctx = canvas.getContext('2d');
    var w = canvas.width = window.innerWidth;
    var h = canvas.height = window.innerHeight;
    var snow = [];
    // 1. 增加雪花数量，让效果更密集；调整雪花半径范围，大小更自然
    var snowCount = 150; 
    for(var i=0; i<snowCount; i++){
        snow.push({
            x: Math.random()*w,
            y: Math.random()*h,
            r: Math.random()*4+0.5, // 半径0.5-4.5px，更贴近真实雪花大小
            dx: Math.random()*1.5-0.75, // 水平偏移更小，飘落更平缓
            dy: Math.random()*2+1, // 垂直速度保持
            // 新增：每片雪花的专属颜色（带轻微冷色调差异）
            color: getSnowColor(),
            // 新增：轻微的旋转角度，增加动态感
            rotate: Math.random()*360
        });
    }

    // 2. 生成自然的雪花颜色（带淡蓝/浅灰调，而非纯白）
    function getSnowColor() {
        // 冷色调：R略低，B略高，模拟雪花的通透感
        var r = 245 + Math.random() * 10;
        var g = 248 + Math.random() * 7;
        var b = 250 + Math.random() * 5;
        // 透明度根据雪花大小调整（小雪花更透明）
        var alpha = 0.7 + Math.random() * 0.25;
        return 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
    }

    // 3. 绘制六角雪花（替代圆形），更贴近真实雪花形状
    function drawSnowflake(x, y, radius, color, rotate) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotate * Math.PI / 180); // 应用旋转
        ctx.fillStyle = color;
        ctx.beginPath();
        
        // 绘制六角形雪花的核心
        for (var i = 0; i < 6; i++) {
            ctx.lineTo(radius, 0);
            ctx.translate(radius * 0.5, 0);
            ctx.rotate(Math.PI / 6);
            ctx.lineTo(-radius * 0.5, 0);
            ctx.translate(-radius * 0.5, 0);
            ctx.rotate(Math.PI / 6);
        }
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    function draw(){
        ctx.clearRect(0,0,w,h);
        for(var i=0; i<snow.length; i++){
            var s = snow[i];
            // 替换圆形绘制为六角雪花绘制
            drawSnowflake(s.x, s.y, s.r, s.color, s.rotate);
            // 轻微更新旋转角度，让雪花有飘落的动态感
            s.rotate += 0.5;
        }
    }

    function update(){
        for(var i=0; i<snow.length; i++){
            var s = snow[i];
            s.x += s.dx;
            s.y += s.dy;
            
            // 4. 优化重置逻辑：雪花超出底部后，从顶部随机位置重新飘落
            if(s.y > h){
                s.y = -10; // 从视口外开始飘落，更自然
                s.x = Math.random()*w;
                s.color = getSnowColor(); // 重置颜色，增加变化
            }
            // 5. 水平超出边界时，从另一侧出现（而非随机位置），更流畅
            if(s.x < 0){
                s.x = w;
            } else if(s.x > w){
                s.x = 0;
            }
        }
    }

    function loop(){
        draw();
        update();
        requestAnimationFrame(loop);
    }
    loop();

    // 窗口大小变化时，重新设置canvas尺寸
    window.addEventListener('resize', function(){
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    });
})();