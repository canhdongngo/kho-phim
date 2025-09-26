 // Dữ liệu mẫu cho các ảnh (đã sửa theo yêu cầu)
        const images = [
            {
                src: "https://i.ibb.co/YTtWmjJh/Dillon-Roman-Dominated-By-Malik.jpg",
                name: "Onlyfans – Dillon Roman Dominated By Malik",
                downloadLink: "https://archive.org/download/3xmovie/Dillon%20Roman%20Dominated%20By%20Malik.mp4"
            },
			{
                src: "https://i.ibb.co/MxNVRjg4/Monster-penis-Daddy-And-Son-raw-unprotected-Creampie.jpg",
                name: "Onlyfans – Monster penis Daddy And Son raw unprotected Creampie",
                downloadLink: "https://archive.org/download/3xmovie/Monster%20penis%20Daddy%20And%20Son%20raw%20unprotected%20Creampie.mp4"
            },
			{
                src: "https://i.ibb.co/6RdrTJKh/Cocky-Boys-Arno-Antino-Jacob-King.jpg",
                name: "CockyBoys – Arno Antino & Jacob King",
                downloadLink: "https://archive.org/download/3xmovie/CockyBoys%20%E2%80%93%20Arno%20Antino%20%26%20Jacob%20King.mp4"
            },
			{
                src: "https://i.ibb.co/chGGK23p/Only-Fans-Alex-Maldonado-Charlie-Cherry-Dato-Foland.jpg",
                name: "Onlyfans – Alex Maldonado, Charlie Cherry & Dato Foland",
                downloadLink: "https://archive.org/download/3xmovie/Onlyfans%20%E2%80%93%20Alex%20Maldonado%2C%20Charlie%20Cherry%20%26%20Dato%20Foland.mp4"
            },
			{
                src: "https://i.ibb.co/k20p1dyM/Only-Fans-Jett-Wayne-jerking-off-his-big-dick-in-the-car.jpg",
                name: "Onlyfans – Jett Wayne jerking off his big dick in the car",
                downloadLink: "https://archive.org/download/3xmovie/OnlyFans%20-%20Jett%20Wayne%20jerking%20off%20his%20big%20dick%20in%20the%20car.mp4"
            },
			{
                src: "https://i.ibb.co/pvmGY66p/Only-Fans-Jordan-Hung-Andres-Milan.jpg",
                name: "Onlyfans – Jordan Hung & Andres Milan",
                downloadLink: "https://archive.org/download/3xmovie/OnlyFans%20-%20Jordan%20Hung%20%26%20Andres%20Milan.mp4"
            },
			{
                src: "https://i.ibb.co/cK9hLhJT/Only-Fans-Jose-Poyato-QBNNBQ.jpg",
                name: "Onlyfans – Jose Poyato & QBNNBQ",
                downloadLink: "https://archive.org/download/3xmovie/OnlyFans%20-%20Jose%20Poyato%20%26%20QBNNBQ.mp4"
            },
			{
                src: "https://i.ibb.co/Y7bZFrWh/Corbin-Fisher-Tony-Feeds-Rocky.jpg",
                name: "CorbinFisher – Tony Feeds Rocky",
                downloadLink: "https://archive.org/download/3xmovie/CorbinFisher%20%E2%80%93%20Tony%20Feeds%20Rocky.mp4"
            },
			{
                src: "https://i.ibb.co/hJVm97c9/Only-Fans-Miles-Fallon-Michael-Boston.jpg",
                name: "OnlyFans – Miles Fallon & Michael Boston",
                downloadLink: "#"
            },
			{
                src: "https://i.ibb.co/CsB0WLDk/Bait-Bus-Making-Money-Dave-Wikkinson-Aaron-Perez.jpg",
                name: "BaitBus – Making Money – Dave Wikkinson & Aaron Perez",
                downloadLink: "#"
            },
			{
                src: "https://i.ibb.co/jZBT8w7R/MEN-Sunny-With-A-Chance-Of-Cock-Malik-Delgaty-Bunker.jpg",
                name: "MEN – Sunny With A Chance Of Cock – Malik Delgaty & Bunker",
                downloadLink: "#"
            }
        ];
		
        // Các biến toàn cục
        let currentPage = 1;
        const itemsPerPage = 6;
        let currentCatalog = 'all';
        let currentSearchTerm = '';
        let filteredImages = [];

        // Hàm xáo trộn mảng (Fisher-Yates shuffle)
        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }

        // Hàm trích xuất catalog từ tên (lấy phần trước dấu '–' đầu tiên)
        function extractCatalog(name) {
            return name.split('–')[0].trim();
        }

        // Thêm catalog vào mỗi image
        images.forEach(image => {
            image.catalog = extractCatalog(image.name);
        });

        // Lấy danh sách catalog duy nhất
        const uniqueCatalogs = [...new Set(images.map(image => image.catalog))];

        // Hàm tạo các button catalog
        function generateCatalogButtons() {
            const catalogFilter = document.getElementById('catalog-filter');
            
            // Tạo nút "All"
            const allButton = document.createElement('button');
            allButton.classList.add('catalog-btn', 'active');
            allButton.textContent = 'All';
            allButton.dataset.catalog = 'all';
            allButton.addEventListener('click', () => filterByCatalog('all'));
            catalogFilter.appendChild(allButton);
            
            // Tạo nút cho từng catalog
            uniqueCatalogs.forEach(catalog => {
                const button = document.createElement('button');
                button.classList.add('catalog-btn');
                button.textContent = catalog;
                button.dataset.catalog = catalog;
                button.addEventListener('click', () => filterByCatalog(catalog));
                catalogFilter.appendChild(button);
            });
        }

        // Hàm lọc theo catalog
        function filterByCatalog(catalog) {
            currentCatalog = catalog;
            currentPage = 1;
            
            // Cập nhật trạng thái active của nút
            document.querySelectorAll('.catalog-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            document.querySelector(`.catalog-btn[data-catalog="${catalog}"]`).classList.add('active');
            
            // Lọc danh sách ảnh
            filterImages();
        }

        // Hàm lọc ảnh dựa trên catalog và từ khóa tìm kiếm
        function filterImages() {
            if (currentCatalog === 'all') {
                filteredImages = [...images];
            } else {
                filteredImages = images.filter(image => image.catalog === currentCatalog);
            }
            
            // Áp dụng tìm kiếm
            if (currentSearchTerm) {
                filteredImages = filteredImages.filter(image => {
                    const nameOnly = image.name.toLowerCase();
                    return nameOnly.includes(currentSearchTerm);
                });
            }
            
            // Xáo trộn danh sách kết quả
            filteredImages = shuffleArray(filteredImages);
            
            // Hiển thị danh sách đã lọc
            displayImages();
            updatePagination();
            
            // Cuộn đến danh sách
            document.getElementById('image-list').scrollIntoView({ behavior: 'smooth' });
        }

        // Hàm hiển thị danh sách ảnh
        function displayImages() {
            const imageList = document.getElementById('image-list');
            const noResults = document.getElementById('no-results');
            const loading = document.getElementById('loading');
            
            // Ẩn loading
            loading.classList.add('hidden');
            
            imageList.innerHTML = ''; // Xóa nội dung cũ

            if (filteredImages.length === 0) {
                noResults.classList.remove('hidden');
                document.getElementById('pagination').classList.add('hidden');
                return;
            }
            
            noResults.classList.add('hidden');
            document.getElementById('pagination').classList.remove('hidden');

            // Tính toán items để hiển thị cho trang hiện tại
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = Math.min(startIndex + itemsPerPage, filteredImages.length);
            const currentItems = filteredImages.slice(startIndex, endIndex);

            currentItems.forEach(image => {
                const listItem = document.createElement('li');

                // Phần chứa ảnh
                const imgElement = document.createElement('img');
                imgElement.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%232a2a2a'/%3E%3C/svg%3E";
                imgElement.dataset.src = image.src; // Lazy loading
                imgElement.alt = image.name;
                imgElement.classList.add('movie-poster');
                imgElement.loading = "lazy"; // Native lazy loading

                // Phần chứa thông tin
                const infoContainer = document.createElement('div');
                infoContainer.classList.add('movie-info');

                // Catalog
                const catalogElement = document.createElement('div');
                catalogElement.classList.add('movie-catalog');
                catalogElement.textContent = image.catalog;
                infoContainer.appendChild(catalogElement);

                // Tiêu đề phim (bỏ catalog ra)
                const titleElement = document.createElement('h3');
                titleElement.classList.add('movie-title');
                
                // Chỉ hiển thị phần sau catalog
                const titleWithoutCatalog = image.name.replace(image.catalog + ' – ', '');
                titleElement.textContent = titleWithoutCatalog;

                // Nút download
                const downloadButton = document.createElement('a');
                downloadButton.href = image.downloadLink;
                downloadButton.innerHTML = '<i class="fas fa-download"></i> Download';
                downloadButton.classList.add('button');
                downloadButton.target = '_blank';

                infoContainer.appendChild(titleElement);
                infoContainer.appendChild(downloadButton);

                listItem.appendChild(imgElement);
                listItem.appendChild(infoContainer);

                imageList.appendChild(listItem);
            });
            
            // Tải hình ảnh lazy
            lazyLoadImages();
        }

        // Hàm lazy load images
        function lazyLoadImages() {
            const lazyImages = document.querySelectorAll('img[data-src]');
            
            if ('IntersectionObserver' in window) {
                const imageObserver = new IntersectionObserver((entries, observer) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const img = entry.target;
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                            imageObserver.unobserve(img);
                        }
                    });
                });

                lazyImages.forEach(img => {
                    imageObserver.observe(img);
                });
            } else {
                // Fallback cho trình duyệt không hỗ trợ IntersectionObserver
                lazyImages.forEach(img => {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                });
            }
        }

        // Hàm cập nhật phân trang
        function updatePagination() {
            const pagination = document.getElementById('pagination');
            pagination.innerHTML = '';
            
            const totalPages = Math.ceil(filteredImages.length / itemsPerPage);
            
            if (totalPages <= 1) {
                pagination.classList.add('hidden');
                return;
            }
            
            pagination.classList.remove('hidden');
            
            // Nút Previous
            const prevButton = document.createElement('button');
            prevButton.classList.add('page-btn');
            prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
            prevButton.disabled = currentPage === 1;
            prevButton.addEventListener('click', () => {
                if (currentPage > 1) {
                    currentPage--;
                    displayImages();
                    updatePagination();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            });
            pagination.appendChild(prevButton);
            
            // Hiển thị các nút trang
            const maxVisiblePages = 5;
            let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
            let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
            
            if (endPage - startPage + 1 < maxVisiblePages) {
                startPage = Math.max(1, endPage - maxVisiblePages + 1);
            }
            
            for (let i = startPage; i <= endPage; i++) {
                const pageButton = document.createElement('button');
                pageButton.classList.add('page-btn');
                if (i === currentPage) {
                    pageButton.classList.add('active');
                }
                pageButton.textContent = i;
                pageButton.addEventListener('click', () => {
                    currentPage = i;
                    displayImages();
                    updatePagination();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                });
                pagination.appendChild(pageButton);
            }
            
            // Nút Next
            const nextButton = document.createElement('button');
            nextButton.classList.add('page-btn');
            nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
            nextButton.disabled = currentPage === totalPages;
            nextButton.addEventListener('click', () => {
                if (currentPage < totalPages) {
                    currentPage++;
                    displayImages();
                    updatePagination();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            });
            pagination.appendChild(nextButton);
            
            // Thông tin trang
            const pageInfo = document.createElement('div');
            pageInfo.classList.add('page-info');
            pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
            pagination.appendChild(pageInfo);
        }

        // Khởi tạo trang
        function initPage() {
            // Tạo các button catalog
            generateCatalogButtons();
            
            // Khởi tạo filteredImages với tất cả ảnh (đã xáo trộn)
            filteredImages = shuffleArray([...images]);
            
            // Hiển thị danh sách ảnh ban đầu sau một khoảng thời gian giả lập loading
            setTimeout(() => {
                displayImages();
                updatePagination();
            }, 500);

            // Tìm kiếm ảnh
            document.getElementById('search-input').addEventListener('input', function() {
                currentSearchTerm = this.value.toLowerCase();
                currentPage = 1;
                
                // Hiển thị loading khi tìm kiếm
                if (currentSearchTerm.length > 0) {
                    document.getElementById('loading').classList.remove('hidden');
                }

                // Sử dụng debounce để tránh tìm kiếm quá nhiều lần
                clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                    filterImages();
                }, 300);
            });
        }

        // Khởi chạy khi trang được tải
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initPage);
        } else {
            initPage();
        }