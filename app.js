// DOM 加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有功能
    initHeaderScrollEffect();
    initExpandableContent();
    initDetailModal();
});

/**
 * 初始化导航栏滚动效果
 */
function initHeaderScrollEffect() {
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/**
 * 初始化内容展开/折叠功能
 */
function initExpandableContent() {
    const expandButtons = document.querySelectorAll('.expand-btn');
    
    // 检查内容是否超过2行，不超过则隐藏展开按钮
    document.querySelectorAll('.content-text').forEach(text => {
        const button = text.parentElement.nextElementSibling;
        if (text.scrollHeight <= text.offsetHeight) {
            button.style.display = 'none';
        }
    });
    
    // 为展开按钮添加点击事件
    expandButtons.forEach(button => {
        button.addEventListener('click', function() {
            const textElement = this.previousElementSibling.querySelector('.content-text');
            
            if (textElement.classList.contains('text-expanded')) {
                // 折叠内容
                textElement.classList.remove('text-expanded');
                this.innerHTML = '展开 <i class="fa fa-angle-down ml-1" aria-hidden="true"></i>';
            } else {
                // 展开内容
                textElement.classList.add('text-expanded');
                this.innerHTML = '收起 <i class="fa fa-angle-up ml-1" aria-hidden="true"></i>';
            }
        });
    });
}

/**
 * 初始化详情弹窗功能
 */
function initDetailModal() {
    // 获取DOM元素
    const modal = document.getElementById('detailModal');
    const modalContent = document.getElementById('modalContent');
    const modalTitle = document.getElementById('modalTitle');
    const modalDetails = document.getElementById('modalDetails');
    const modalSize = document.getElementById('modalSize');
    const modalFormat = document.getElementById('modalFormat');
    const modalVersion = document.getElementById('modalVersion');
    const cancelBtn = document.getElementById('cancelBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const downloadSuccess = document.getElementById('downloadSuccess');
    let currentDownloadTitle = '';

    // 打开弹窗
    document.querySelectorAll('.view-details').forEach(button => {
        button.addEventListener('click', function() {
            // 移除其他按钮的活跃标识
            document.querySelectorAll('.view-details').forEach(btn => {
                btn.classList.remove('view-details-active');
            });
            // 给当前点击的按钮添加活跃标识
            this.classList.add('view-details-active');
            
            // 从按钮数据属性中获取资源信息
            currentDownloadTitle = this.getAttribute('data-title');
            modalTitle.textContent = currentDownloadTitle;
            modalDetails.textContent = this.getAttribute('data-details');
            modalSize.textContent = this.getAttribute('data-size');
            modalFormat.textContent = this.getAttribute('data-format');
            modalVersion.textContent = this.getAttribute('data-version');
            
            // 显示弹窗
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
            
            // 重置滚动位置
            const contentArea = modalContent.querySelector('.overflow-y-auto');
            contentArea.scrollTop = 0;
            
            // 触发弹窗动画
            setTimeout(() => {
                modalContent.classList.remove('scale-95', 'opacity-0');
                modalContent.classList.add('scale-100', 'opacity-100');
            }, 10);
        });
    });

    // 关闭弹窗函数
    function closeModal() {
        modalContent.classList.remove('scale-100', 'opacity-100');
        modalContent.classList.add('scale-95', 'opacity-0');
        
        setTimeout(() => {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        }, 300);
    }

    // 取消按钮事件
    cancelBtn.addEventListener('click', closeModal);

    // 点击弹窗外部关闭
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // 按ESC键关闭弹窗
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });

    // 下载按钮事件 - 使用data-download属性作为下载链接
    downloadBtn.addEventListener('click', function() {
        // 获取当前激活按钮的下载链接
        const downloadUrl = document.querySelector('.view-details-active')?.getAttribute('data-download') || '#';
        window.open(downloadUrl, '_blank');
        closeModal();
        
        // 显示下载成功提示
        setTimeout(() => {
            downloadSuccess.classList.remove('translate-y-20', 'opacity-0');
            downloadSuccess.classList.add('translate-y-0', 'opacity-100');
            
            // 3秒后隐藏提示
            setTimeout(() => {
                downloadSuccess.classList.remove('translate-y-0', 'opacity-100');
                downloadSuccess.classList.add('translate-y-20', 'opacity-0');
            }, 3000);
        }, 300);
    });
}
