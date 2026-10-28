// Form Submit Simulation
        document.getElementById('booking-form').addEventListener('submit', function(e) {
            e.preventDefault();
            const feedback = document.getElementById('form-feedback');
            const userName = document.getElementById('user-name').value;
            const summary = document.getElementById('form-budget-summary').value;

            feedback.className = "mb-6 p-4 rounded-xl text-sm font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200";
            feedback.innerHTML = `<i class="fa-solid fa-circle-check mr-2"></i> Obrigado, <strong>${userName}</strong>! Sua solicitação de agendamento foi recebida com sucesso. Entraremos em contato via WhatsApp para confirmar os detalhes.<br><span class="text-xs font-normal mt-1 block text-emerald-700">Resumo: ${summary}</span>`;
            feedback.classList.remove('hidden');

            // Reset Form fields except budget summary
            this.reset();
            calculateEstimate();
        });
