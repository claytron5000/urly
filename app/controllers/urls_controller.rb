class UrlsController < ApplicationController

    @@alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('')
    @@base = @@alphabet.length

    def new
        @url = Url.new
    end

    def show

    end

    def create
        # @todo check for target url in database so we don't recreate
        @url = Url.new(params.require(:url).permit(:target_url))
        @url.save
        @url.shortened_url = convertTo62(@url.id)
        @url.save
        render 'show'
    
    end

    def goto
        @shortened = params[:shortened_url]
        @index = convertFrom62(@shortened)
        @url = Url.find_by_id(@index)
        if @url != nil
            redirect_to @url.target_url
        else
            redirect_to request.base_url
        end
    end

    private
        def convertTo62(number)
            
            @remander = number % @@base
            @result = @@alphabet[@remander]
            @quotient = number/@@base
            while (@quotient != 0)
                @remander = @quotient % @@base
                @quotient = @quotient/@@base
                @result = @@alphabet[@remander].to_s + @result
            end
            return @result
        end
    
        private 
            def convertFrom62(number)
                
                @result = 0
                number.split('').each do |num|
                    @result = @@base * @result + @@alphabet.index(num)
                end
                
                return @result;
            end

end
