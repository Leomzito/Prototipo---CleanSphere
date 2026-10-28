// Interactive Budget Calculator State
        let currentRooms = 2;
        
        const basePrices = {
            residencial: 120,
            pos_obra: 220,
            comercial: 180
        };

        const pricePerM2 = {
            residencial: 1.0,
            pos_obra: 1.8,
            comercial: 1.3
        };

        // DOM Elements
        const sliderSize = document.getElementById('calc-size');
        const sizeVal = document.getElementById('calc-size-val');
        const roomsVal = document.getElementById('calc-rooms-val');
        const btnMinusRooms = document.getElementById('btn-minus-rooms');
        const btnPlusRooms = document.getElementById('btn-plus-rooms');

        const addWindows = document.getElementById('add-windows');
        const addFridge = document.getElementById('add-fridge');
        const addSofa = document.getElementById('add-sofa');

        const summaryService = document.getElementById('summary-service');
        const summarySize = document.getElementById('summary-size');
        const summaryTime = document.getElementById('summary-time');
        const summaryAddons = document.getElementById('summary-addons');
        const totalPriceEl = document.getElementById('total-price');

        // Functions
        function calculateEstimate() {
            const selectedService = document.querySelector('input[name="calc-service"]:checked').value;
            const size = parseInt(sliderSize.value);

            // Calculation Logic
            let base = basePrices[selectedService];
            let sizeCost = size * pricePerM2[selectedService];
            let roomsCost = currentRooms * 15;

            let addonsTotal = 0;
            let addonsList = [];

            if (addWindows.checked) {
                addonsTotal += 60;
                addonsList.push('Vidros');
            }
            if (addFridge.checked) {
                addonsTotal += 40;
                addonsList.push('Geladeira');
            }
            if (addSofa.checked) {
                addonsTotal += 120;
                addonsList.push('Sofá');
            }

            let total = Math.round(base + sizeCost + roomsCost + addonsTotal);

            // Estimated Hours
            let hours = (size / 25) + (currentRooms * 0.3);
            if (selectedService === 'pos_obra') hours *= 1.4;

            // DOM Updates
            sizeVal.innerText = size;
            roomsVal.innerText = currentRooms;

            const serviceNames = {
                residencial: 'Residencial',
                pos_obra: 'Pós-Obra',
                comercial: 'Comercial'
            };

            summaryService.innerText = serviceNames[selectedService];
            summarySize.innerText = `${size} m² (${currentRooms} cômodos)`;
            summaryTime.innerText = `~ ${hours.toFixed(1)} horas`;
            summaryAddons.innerText = addonsList.length > 0 ? addonsList.join(', ') : 'Nenhum';
            totalPriceEl.innerText = `R$ ${total}`;

            // Store summary in form hidden field
            document.getElementById('form-budget-summary').value = 
                `Serviço: ${serviceNames[selectedService]} | Tamanho: ${size}m² | Cômodos: ${currentRooms} | Adicionais: ${addonsList.join(', ') || 'Nenhum'} | Total Estimado: R$ ${total}`;
        }

        // Event Listeners for Calculator
        sliderSize.addEventListener('input', calculateEstimate);
        
        document.querySelectorAll('input[name="calc-service"]').forEach(radio => {
            radio.addEventListener('change', calculateEstimate);
        });

        [addWindows, addFridge, addSofa].forEach(chk => {
            chk.addEventListener('change', calculateEstimate);
        });

        btnMinusRooms.addEventListener('click', () => {
            if (currentRooms > 1) {
                currentRooms--;
                calculateEstimate();
            }
        });

        btnPlusRooms.addEventListener('click', () => {
            if (currentRooms < 10) {
                currentRooms++;
                calculateEstimate();
            }
        });

        // "Agendar com este Orçamento" smooth scroll and focus
        document.getElementById('btn-use-estimate').addEventListener('click', () => {
            document.getElementById('contato').scrollIntoView({ behavior: 'smooth' });
            document.getElementById('user-name').focus();
        });
